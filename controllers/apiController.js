import User from "../models/user";
import Links from "../models/links";
import Ads from "../models/ads";
import { deleteLinkFiles } from "./useful";
import hash from "js-sha256";
import "dotenv/config";
import jwt from "jsonwebtoken";

/* GET */

export const testApi = async (req, res) => {
    /*const links = await Links.find({},((err, links) => {
        return links;
    }));

    let temp = links.map(item => {
        return item.imagePath;
    })
    res.send(temp);*/

    const user = await User.find({}, ((err, user) => {
        return user;
    })).skip(0).limit(30);

    res.send(user);
}
export const holdemInit = async (req, res) => {
    let {startAt, endAt} = req.query;
    if(startAt === undefined) startAt = 0;
    if(endAt === undefined) endAt = 30;

    const links = await Links.find({},((err, links) => {
        return links;
    }));

    const users = await User.find({}, ((err,users) => {
        return users;
    })).skip(Number(startAt)).limit(Number(endAt));

    users.forEach((items, index) => {
        let sum = 0;
        items.records.forEach(item => {
            sum = sum + item.money;
        })
        users[index] = users[index].toObject();
        users[index].totalMoney = sum;
    });


    const ads = await Ads.find({}, ((err, ads) => {
        return ads;
    }));

    res.status(200).json({
        status: 200,
        msg: "조회 성공",
        data: {
            links,
            users,
            ads
        }
    });
}

export const searchUser = (req, res) => {
    const {name} = req.params;
    User.find({name: name}, ((err, users) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        let sum = 0;

        users.forEach((items, index) => {
            let sum = 0;
            items.records.forEach(item => {
                sum = sum + item.money;
            })
            users[index] = users[index].toObject();
            users[index].totalMoney = sum;
        })
        res.status(200).json({status:200, msg: "조회 성공", data: users});
    }));
}

export const searchAds = (req, res) => {
    const {name} = req.params;
    console.log(name);
    Ads.find({name: name}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: ads});
    }));
}

export const getUsers = async (req, res) => {
    let {startAt, endAt} = req.query;
    if(startAt === undefined) startAt = 0;
    if(endAt === undefined) endAt = 30;

    User.find({},((err,users) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});

        users.forEach((items, index) => {
            let sum = 0;
            items.records.forEach(item => {
                sum = sum + item.money;
            })
            users[index] = users[index].toObject();
            users[index].totalMoney = sum;
        })

        res.status(200).json({status:200, msg: "조회 성공", data: users});
    })).skip(Number(startAt)).limit(Number(endAt));
}

export const getUser = async (req, res) => {
    const idx = req.params.idx;



    User.findOne({idx: idx}, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        let sum = 0;
        user.records.forEach(item => {
            sum = sum + item.money;
        })
        res.status(200).json({status:200, msg: "조회 성공", data: user, totalMoney: sum});
    }));
}

export const getAds = (req, res) => {
    Ads.find({}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: ads});
    }));
}

export const getAd = (req, res) => {
    const location = req.params.location;
    Ads.find({location: location}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: ads});
    }));
}

export const getAdInfo = (req, res) => {
    const idx = req.params.idx;
    Ads.findOne({idx: idx}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: ads});
    }));
}

export const getLinks = (req, res) => {
    Links.find({},((err, links) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        let array = [{}, {}, {}, {}, {}];
        links.forEach(item => {
            array[item.imageTarget-1].imagePath = item.imagePath;
            array[item.imageTarget-1].imageLocate = item.imageLocate;
            array[item.imageTarget-1].imageTarget = item.imageTarget;
        });

        res.status(200).json({status:200, msg: "조회 성공", data: links, btyArray: array});
    }));
}


/* POST */
export const login = (req, res) => {
    const passwd = req.body.passwd;
    const serverPasswd = hash.sha256(process.env.CRYPT_PASSWD);

    if(passwd !== serverPasswd) {
        res.json({status: 200, msg: "failed"});
    }else {
        let token = jwt.sign({
            userId: "holdemAdmin",
        }, "holdem_ranking_api_use#$*", {
            expiresIn: '60m'
        });
        res.cookie("token", token);
        res.json({status:200, msg: "success", token});
    }
};

export const createUser = (req, res) => {
    const {rank, name, age, location, records} = req.body;
    const filename = req.file.filename;

    User.create({
        rank,
        name,
        age,
        location,
        profile: filename,
        records: JSON.parse(records),
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 생성 실패"});
        res.status(200).json({status:200, msg: "User 생성 성공"});
    }));
}

export const updateBanner = async (req, res) => {
    const {target, locate} = req.body;
    const file = req.file;

    let prev_links = await Links.findOne({imageTarget: target});
    if(prev_links) deleteLinkFiles([prev_links.imagePath]);
    else console.log(prev_links);

    let links = await Links.findOneAndUpdate(
        {imageTarget: target}, 
        {imagePath: `/${file.filename}`, imageLocate: locate},
        {upsert: true}
    );

    res.status(200).json({status: 200, msg: "Links 생성 성공"});
    
}

export const createAds = (req, res) => {
    /*
    seoul, busan, daegu, incheon, gwangju, daejeon, ulsan, sejong, gyeonngi,
    kangwon, chungbuk, chungnam, jeonbuk, jeonnam, gyeongbuk, gyeongnam, jaeju
    */

    const {name, addr, content} = req.body;
    const location = req.params.location;
    const profile = `/${req.file.filename}`;

    console.log(location);
    
    Ads.create({
        location,
        profile,
        name,
        addr,
        content
    }, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 생성 실패"});
        res.status(200).json({status:200, msg: "Ads 생성 성공"});
    }));

}

/* PUT */

export const updateUser = async (req, res) => {
    const {idx, rank, name, age, location, records} = req.body;
    let profile = "";
    if(req.file) {
        profile = `/${req.file.filename}`;
        const user = await User.findOne({idx: idx});
        deleteLinkFiles([`/${user.profile}`]);
    }else {
        profile = req.body.profile;
    }

    User.updateOne({idx: idx}, {
        rank,
        name,
        age,
        location,
        profile,
        records: JSON.parse(records)
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 업데이트 실패"});
        res.status(200).json({status:200, msg: "User 업데이트 성공"});
    }));
}

export const updateAds = async (req, res) => {
    const {name, idx, addr, content} = req.body;
    const location = req.params.location;
    let profile = "";

    if(req.file) {
        profile = `/${req.file.filename}`;
        const ads = await Ads.findOne({idx: idx});
        console.log(ads);
        deleteLinkFiles([`/${ads.profile}`]);
    }else {
        profile = req.body.profile;
    }
    
    Ads.updateOne({idx: idx}, {
        location,
        profile,
        name,
        addr,
        content
    }, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 업데이트 실패"});
        res.status(200).json({status:200, msg: "Ads 업데이트 성공"});
    }));
}

/* DELETE */

export const deleteAds = async (req, res) => {
    const idx = req.params.idx;
    const ads = await Ads.findOne({idx: idx});
    deleteLinkFiles([`/${ads.profile}`]);
    Ads.deleteOne({idx: idx}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 삭제 실패"});
        res.status(200).json({status:200, msg: "Ads 삭제 성공"});
    }));
}

export const deleteUser = async (req, res) => {
    const idx = req.params.idx;
    const user = await User.findOne({idx: idx});
    deleteLinkFiles([`/${user.profile}`]);
    User.deleteOne({idx: idx}, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 삭제 실패"});
        res.status(200).json({status:200, msg: "User 삭제 성공"});
    }));
}
