const path = require("path");
const HtmlElementPlugin = require("html-webpack-plugin");

module.exports = {

    entry : {
        index : "./src/script/index.js",
        myfile : "./src/script/myfile.js"
    },
    output : {
        path : path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module : {
        
        rules : [
            {
                test : /\.css$/,
                use : [
                    {
                        loader : "style-loader"
                    },
                    {
                        loader : "css-loader"
                    }
                ]
            }
            // {
            //     test : /\.html$/,
            //     use : [
            //         {
            //             loader : "file-loader",
            //             options : {
            //                 name : "[name].[ext]"
            //             }
            //         }
            //     ],
            //     exclude : path.resolve(__dirname, "src/index.html")
            // }
        ]

    },
    plugins : [
        new HtmlElementPlugin({
            template : "src/index.html",
            filename : "index.html",
            excludeChunks : ['myfile']
        }),
        new HtmlElementPlugin({
            template : "src/myfile.html",
            filename : "myfile.html",
            chunks : ['myfile']
        })
    ]
}

