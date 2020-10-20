import User from "../models/user";
import Links from "../models/links";
import Ads from "../models/ads";

/* GET */
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
    if(endAt === undefined) endAt = 100;

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
        records
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "User 생성 실패"});
        res.status(200).json({status:200, msg: "User 생성 성공"});
    }));
}

export const updateBanner = async (req, res) => {
    const imageTargets = req.body.targets;
    const paths = req.files.map((file, i) => {
        const currentTarget = imageTargets[i];
        const key = `imagePath${currentTarget}`;
        const f = {[key] : `/${file.filename}`};
        return f;
    });

    /* TODO */
}

export const createAds = (req, res) => {
    /*
    seoul, busan, daegu, incheon, gwangju, daejeon, ulsan, sejong, gyeonngi,
    kangwon, chungbuk, chungnam, jeonbuk, jeonnam, gyeongbuk, gyeongnam, jaeju
    */

    const name = req.body.name;
    const location = req.params.location;
    const profile = `/${req.file.filename}`;

    console.log(location);
    
    Ads.create({
        location,
        profile,
        name
    }, ((err, ads) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 생성 실패"});
        res.status(200).json({status:200, msg: "Ads 생성 성공"});
    }));

}

/* PUT */

export const updateAds = (req, res) => {
    const {name, idx} = req.body;
    const location = req.params.location;
    const profile = `/${req.file.filename}`;
    
    Ads.updateOne({idx: idx}, {
        location,
        profile,
        name
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
