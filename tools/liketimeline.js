const { chalk, inquirer, _, fs, instagram, print, delay } = require("./index.js");

(async () => {
    print(
        chalk`{bold.magenta
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

  Ξ TITLE  : Like All Media on Timeline
  Ξ UPDATE : Wednesday, March 27, 2024 (GMT+8)
           : TESTED "OK" BUG? YouTellMe!
    }`
    );
    const questions = [
        {
            type: "input",
            name: "username",
            message: "Input username:",
            validate: (val) => val.length != 0 || "Please input username!",
        },
        {
            type: "password",
            name: "password",
            mask: "*",
            message: "Input password:",
            validate: (val) => val.length != 0 || "Please input password!",
        },
        {
            type: "input",
            name: "perExec",
            message: "Input limit per-execution:",
            validate: (val) => /[0-9]/.test(val) || "Only input numbers",
        },
        {
            type: "input",
            name: "delayTime",
            message: "Input delay time (in milliseconds):",
            validate: (val) => /[0-9]/.test(val) || "Only input numbers",
        },
    ];

    try {
        const { username, password, perExec, delayTime } = await inquirer.prompt(questions);
        const ig = new instagram(username, password);
        print("Try to Login . . .", "wait", true);
        const login = await ig.login();
        print(`Logged in as @${login.username} (User ID: ${login.pk})`, "ok");
        print("Collecting timeline feeds . . .", "wait");
        const feed = await ig.timelineFeed();
        print(`Doing task with ratio ${perExec} target / ${delayTime} milliseconds \n`, "wait");
        do {
            let items = await feed.items();
            items = _.chunk(items, perExec);
            for (let i = 0; i < items.length; i++) {
                await Promise.all(
                    items[i].map(async (media) => {
                        if (!media.has_liked) {
                            const like = await ig.like(media.pk);
                            print(`▲ @${media.user.username} [Media ID: ${media.pk}] ⇶ ${like ? chalk.bold.green("Liked!") : chalk.bold.red("Failed to Like!")}`);
                        } else print(chalk`▼ @${media.user.username} [Media ID: ${media.pk}] ⇶ {yellow Already liked!}`);
                    })
                );
                if (i < items.length - 1) print(`Current Account: (${login.username}) » Delay: ${perExec}/${delayTime}ms \n`, "wait", true);
                await delay(delayTime);
            }
        } while (feed.moreAvailable);
        print(`Status: All Task done!`, "ok", true);
    } catch (err) {
        print(err, "err");
    }
})();
//by 1dcea8095a18ac73b764c19e40644b52 116 111 111 108 115 105 103  118 51
