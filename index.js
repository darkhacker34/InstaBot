const { chalk, inquirer, print } = require("./tools/index.js");
var moment = require("moment");
var colors = require("colors");
var userHome = require("user-home");

// DETECT IP *START!
var os = require("os");
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === "IPv4" && !address.internal) {
            addresses.push(address.address);
        }
    }
}
// DETECT IP *END!

const questionTools = [
    "➟ Information",
    "➟ Bot Like Timeline",
    "➟ Like Bot Target User",
    "➟ Mass Delete Post/Photo",

    "➟ F-L -> Followers Target",
    "➟ L-C -> Followers Target",

    "➟ F-L-C -> Followers Target",
    "➟ F-L-C -> Followers Target [BETA]",

    "➟ F-L-C -> Followers Target v2",                                 
    "➟ F-L-DM -> Followers Target",                                       "➥ F-L-DM -> Followers Target [BETA]",

    "➟ F-L-C -> Hashtag Target",
    "➟ F-L-C -> Location Target",                                     
    "➟ Unfollow All Following",
    "➟ Unfollow Not Followback",
    "\n",
];

const menuQuestion = {
    type: "list",
    name: "choice",
    message: "Select tools:\n  Read the (❆ Information) first before using the tool!\n\n",
    choices: questionTools,
};

const main = async () => {
    try {
        const { choice } = await inquirer.prompt(menuQuestion);
        choice == questionTools[0] && require("./tools/info.js");
        choice == questionTools[1] && require("./tools/liketimeline.js");
        choice == questionTools[2] && require("./tools/liketarget.js");
        choice == questionTools[3] && require("./tools/delallmedia.js");
        choice == questionTools[4] && require("./tools/flonly.js");
        choice == questionTools[5] && require("./tools/lconly.js");
        choice == questionTools[6] && require("./tools/fftauto.js");
        choice == questionTools[7] && require("./tools/fftbetaauto.js");
        choice == questionTools[8] && require("./tools/fftautov2.js");
        choice == questionTools[9] && require("./tools/fftdmauto.js");
        choice == questionTools[10] && require("./tools/fftdmbetaauto.js");
        choice == questionTools[11] && require("./tools/fhtauto.js");
        choice == questionTools[12] && require("./tools/fltauto.js");
        choice == questionTools[13] && require("./tools/unfollowall.js");
        choice == questionTools[14] && require("./tools/unfollnotfollback.js");
        choice == questionTools[15] && process.exit();
    } catch (err) {
        print(err, "err");
    }
};

console.log(chalk`{reset.magenta

██╗███╗░░██╗░██████╗████████╗░█████╗░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗
██║██╔██╗██║╚█████╗░░░░██║░░░███████║
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝

██████╗░░█████╗░████████╗
██╔══██╗██╔══██╗╚══██╔══╝
██████╦╝██║░░██║░░░██║░░░
██╔══██╗██║░░██║░░░██║░░░
██████╦╝╚█████╔╝░░░██║░░░
╚═════╝░░╚════╝░░░░╚═╝░░░
}`);

console.log(chalk`{bold.green
  Ξ TITLE  : InstaBot v4.0
  Ξ Instagram  : @nihh____al
  Ξ GitHub   :  darkhacker34
  Ξ UPDATE : Wednesday, March 27, 2025

  116 111 111 108 115 105 103  118 51
  }`);
console.log(chalk`{bold.cyan   •••••••••••••••••••••••••••••••••••••••••}`);
console.log("  Ξ START  : ".bold.cyan + moment().format("D MMMM YYYY, h:mm:ss a"));
console.log("  Ξ YPATH  : ".bold.cyan + userHome);
console.log("  Ξ YOUIP  : ".bold.cyan + addresses);
console.log(chalk`{bold.cyan   •••••••••••••••••••••••••••••••••••••••••}`);

main();
