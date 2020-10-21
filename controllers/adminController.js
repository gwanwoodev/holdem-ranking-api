import {getLinks} from "./apiController";
import fetch from "isomorphic-fetch";

/* GET */
export const showDashBoard = async (req, res) => {
    let links = await fetch("http://localhost:4000/api/links");
    let data = await links.json();
    res.render("index", {links: data});
}