import fs from "fs";
import path from "path";

export const deleteLinkFiles = (array) => {
    /* TODO */
    for(let i=0; i<array.length; i++) {
        let filePath = path.join(__dirname, `../public${array[i]}`);
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if(err) return console.log("삭제할 수 없는 파일입니다");
            fs.unlink(filePath, (err) => {
                if(err) console.log(err);
                else console.log(`${filePath} 삭제완료`);
            })
        })
    }
}

