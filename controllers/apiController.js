import User from "../models/user";
import Links from "../models/links";
import Ads from "../models/ads";
import { deleteLinkFiles } from "./useful";

/* GET */

export const testApi = async (req, res) => {
    const links = await Links.find({},((err, links) => {
        return links;
    }));

    let temp = links.map(item => {
        return item.imagePath;
    })
    res.send(temp);
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
        res.status(200).json({status:200, msg: "조회 성공", data: users});
    }));
}

export const getUsers = (req, res) => {
    let {startAt, endAt} = req.query;
    if(startAt === undefined) startAt = 0;
    if(endAt === undefined) endAt = 30;

    User.find({}, ((err,users) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: users});
    })).skip(Number(startAt)).limit(Number(endAt));
}

export const getUser = (req, res) => {
    const idx = req.params.idx;
    User.findOne({idx: idx}, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: user});
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

export const getLinks = (req, res) => {
    Links.find({},((err, links) => {
        if(err) return res.status(500).json({status:500, msg: "조회 실패"});
        res.status(200).json({status:200, msg: "조회 성공", data: links});
    }));
}


/* POST */
export const createUser = (req, res) => {
    const {rank, name, age, location, records} = req.body;
    const filename = req.file.filename;

    User.create({
        rank,
        name,
        age,
        location,
        profile: filename,
        records,
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 생성 실패"});
        res.status(200).json({status:200, msg: "User 생성 성공"});
    }));
}

export const updateBanner = async (req, res) => {
    const imageTargets = req.body.targets.filter(item => true);
    const imageLocates = req.body.locates.filter(item => true);

    const paths = req.files.map((file, i) => {
        const f = {
            imagePath : `/${file.filename}`,
            target: Number(imageTargets[i]),
            locate: imageLocates[i]
        };
        return f;
    });

    imageTargets.forEach(async item => {
        let links = await Links.findOne({imageTarget: item});
        deleteLinkFiles([links.imagePath]);
    })


    paths.forEach(async item => {
        let link = await Links.findOneAndUpdate(
            {imageTarget: item.target}, 
            {imagePath: item.imagePath, imageLocate: item.locate},
            {upsert: true}
        );
    })

    res.status(200).json({status: 200, msg: "Links 생성 성공"});
    
}

export const createAds = (req, res) => {
    /*
    seoul, busan, daegu, incheon, gwangju, daejeon, ulsan, sejong, gyeonngi,
    kangwon, chungbuk, chungnam, jeonbuk, jeonnam, gyeongbuk, gyeongnam, jaeju
    */

    const {name, addr} = req.body;
    const location = req.params.location;
    const profile = `/${req.file.filename}`;

    console.log(location);
    
    Ads.create({
        location,
        profile,
        name,
        addr
    }, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 생성 실패"});
        res.status(200).json({status:200, msg: "Ads 생성 성공"});
    }));

}

/* PUT */

export const updateUser = async (req, res) => {
    const {idx, rank, name, age, location, records} = req.body;
    const profile = `/${req.file.filename}`;

    const user = await User.findOne({idx: idx});
    
    deleteLinkFiles([`/${user.profile}`]);

    User.updateOne({idx: idx}, {
        rank,
        name,
        age,
        location,
        profile,
        records
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 업데이트 실패"});
        res.status(200).json({status:200, msg: "User 업데이트 성공"});
    }));
}

export const updateAds = async (req, res) => {
    const {name, idx, addr} = req.body;
    const location = req.params.location;
    const profile = `/${req.file.filename}`;

    const previousAds = await Ads.findOne({idx: idx});
    
    deleteLinkFiles([previousAds.profile]);
    
    Ads.updateOne({idx: idx}, {
        location,
        profile,
        name,
        addr,
    }, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 업데이트 실패"});
        res.status(200).json({status:200, msg: "Ads 업데이트 성공"});
    }));
}

/* DELETE */

export const deleteAds = (req, res) => {
    const idx = req.params.idx;
    Ads.deleteOne({idx: idx}, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 삭제 실패"});
        res.status(200).json({status:200, msg: "Ads 삭제 성공"});
    }));
}
