import {getLinks} from "./apiController";
import fetch from "isomorphic-fetch";

/* GET */
export const showDashBoard = async (req, res) => {
    let links = await fetch("https://gwgod.xyz/api/links");
    let linksData = await links.json();
    let users = await fetch("https://gwgod.xyz/api/users");
    let usersData = await users.json();
    res.render("index", {links: linksData, users: usersData});
}

export const showAdsBoard = async (req, res) => {
    let ads = await fetch("https://gwgod.xyz/api/ads");
    let adsData = await ads.json();
    res.render("ads", {ads: adsData});
}