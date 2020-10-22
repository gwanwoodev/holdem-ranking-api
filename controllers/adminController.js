import {getLinks} from "./apiController";
import fetch from "isomorphic-fetch";

/* GET */
export const showDashBoard = async (req, res) => {
    let links = await fetch("http://localhost:4000/api/links");
    let linksData = await links.json();
    let users = await fetch("http://localhost:4000/api/users");
    let usersData = await users.json();
    res.render("index", {links: linksData, users: usersData});
}

export const showAdsBoard = async (req, res) => {
    let ads = await fetch("http://localhost:4000/api/ads");
    let adsData = await ads.json();
    res.render("ads", {ads: adsData});
}