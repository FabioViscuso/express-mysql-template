const config = {
    "PORT": process.env.PORT || "No value set for PORT",
    "SESSION_SECRET": process.env.SESSION_SECRET || "No value set for SESSION_SECRET",
    "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID || "No value set for GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET || "No value set for GITHUB_CLIENT_SECRET",
    "GITHUB_CALLBACK_URL": process.env.GITHUB_CALLBACK_URL || "No value set for GITHUB_CALLBACK_URL"
}

export default config;
