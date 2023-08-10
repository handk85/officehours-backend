const path = require("path");
const root = path.resolve(__dirname, "../");

const { NODE_ENV = "production" } = process.env;

module.exports = {
    entry: `${root}/bin/${NODE_ENV === "production" ? "index.js" : "local.ts"}`,
    mode: NODE_ENV,
    target: "node",
    output: {
        filename: "index.js",
        path: `${root}/build`,
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modules: [path.resolve(__dirname, "../src"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true
                        }
                    }
                ]
            }
        ]
    }
};