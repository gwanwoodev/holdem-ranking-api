import User from "../models/user";
import Links from "../models/links";
import Ads from "../models/ads";

/* GET */

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
    }, ((err, user) => {
        if(err) return res.status(500).json({status:500, msg: "Ads 생성 실패"});
        res.status(200).json({status:200, msg: "Ads 생성 성공"});
    }));

}

/*  PUT */

/* DELETE */
