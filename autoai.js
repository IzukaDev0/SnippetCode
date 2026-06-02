/*

CREDIT XRIZAL (IZUKA)

*/

const VivyAI = require("./lib/vivy");

if (chatsdb[m.chat].autoai && !m.key.fromMe && !isCmd) {
    try {
        const ai = new VivyAI();

        const reply = await ai.chat(
            m.sender,
            m.text
        );

        if (!reply) {
            return m.reply(
                "Maaf, aku tidak mengerti maksudmu."
            );
        }

        await Izuka.sendMessage(
            m.chat,
            {
                text: reply
            },
            {
                quoted: m
            }
        );

    } catch (err) {
        console.error(
            "AutoAI Error:",
            err
        );

        m.reply(
            "Upss error silahkan hubungi owner agar di fix"
        );
    }
}
