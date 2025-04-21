const urlModel = require("../models/urlModel");
const { nanoid } = require("nanoid");

function handleStaticGET(req, res) {
    return res.render("home", { error: null, short: null, clickCount: null });
}

async function handleStaticURLGET(req, res) {
    const short = req.params.short;
    if (!short) {
        return res.status(400).render("home", { error: "Missing short URL", short: null, clickCount: null });
    }

    const result = await urlModel.findOne({ short: short }, { _id: 0 });
    if (!result) {
        return res.status(404).render("home", { error: "Short URL not found", short: null, clickCount: null });
    }

    try {
        await urlModel.updateOne({ short }, { clickCount: result.clickCount + 1 });
    } catch (err) {
        console.log(err);
        return res.status(500).render("home", { error: "Failed to update click count", short: null, clickCount: null });
    }

    return res.redirect(result.long); // Redirection doesn't need EJS
}

async function handlestaticPOST(req, res) {
    const { long } = req.body;
    if (!long) {
        return res.status(400).render("home", { error: "Missing URL", short: null, clickCount: null });
    }

    const short = nanoid(14);

    try {
        await urlModel.create({
            short,
            long,
            clickCount: 1,
        });

        return res.status(201).render("home", {
            error: null,
            short,
            clickCount: null
        });

    } catch (err) {
        console.log(err);
        return res.status(500).render("home", {
            error: "Internal Server Error",
            short: null,
            clickCount: null
        });
    }
}

async function handleStaticGETClickCount(req, res) {
    
    const short  = req.query.short;
    console.log(short);
    if (!short) {
        return res.status(400).render("home", { error: "Missing short param", short: null, clickCount: null });
    }

    const result = await urlModel.findOne({ "short":short }, { _id: 0 });
    console.log(result);

    if (!result) {
        return res.status(404).render("home", { error: "Short URL not found", short: null, clickCount: null });
    }

    return res.status(200).render("home", {
        error: null,
        short: null,
        clickCount: result.clickCount
    });
}

module.exports = {
    handleStaticGET,
    handlestaticPOST,
    handleStaticURLGET,
    handleStaticGETClickCount
};
