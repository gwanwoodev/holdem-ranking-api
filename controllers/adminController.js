import fetch from "isomorphic-fetch";

/* GET */
export const showDashBoard = async (req, res) => {
    let links = await fetch("http://localhost:3000/api/links");
    let linksData = await links.json();
    let users = await fetch("http://localhost:3000/api/users");
    let usersData = await users.json();
    res.render("index", {links: linksData, users: usersData});
}

export const showAdsBoard = async (req, res) => {
    let ads = await fetch("http://localhost:3000/api/ads");
    let adsData = await ads.json();
    res.render("ads", {ads: adsData});
}

export const showLogin = async (req, res) => {
    res.render("login");
}