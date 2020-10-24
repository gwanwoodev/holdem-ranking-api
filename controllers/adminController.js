import fetch from "isomorphic-fetch";

/* GET */
export const showDashBoard = async (req, res) => {
  let links = await fetch("https://holdemranking.com/api/links");
  let linksData = await links.json();
  let users = await fetch("https://holdemranking.com/api/users");
  let usersData = await users.json();
  res.render("index", { links: linksData, users: usersData });
};

export const showAdsBoard = async (req, res) => {
  let ads = await fetch("https://holdemranking.com/api/ads");
  let adsData = await ads.json();
  res.render("ads", { ads: adsData });
};

export const showLogin = async (req, res) => {
  res.render("login");
};
