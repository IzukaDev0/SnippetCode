/**
 * 🍌 EDIT IMAGE PLUGIN
 * Created By : Izuka Dev
 * Using Api : Omegatech Api
 * Feature: Polling Task ID + Buffer Uploader
 */

const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');


async function UploadFileUgu(buffer) {
    try {
        const type = await fromBuffer(buffer);
        const ext = type ? type.ext : 'jpg';
        const filename = Date.now() + '.' + ext;
        
        const form = new FormData();
        form.append("files[]", buffer, { 
            filename, 
            contentType: type?.mime || 'image/jpeg' 
        });

        const res = await axios.post("https://uguu.se/upload.php", form, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                ...form.getHeaders()
            }
        });
        
        return res.data.files[0].url; 
    } catch (err) {
        console.error('Uploader Error:', err);
        return null;
    }
}

let handler = async (m, { Izuka, reply, args, prefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    const calender = new Date().toLocaleDateString("id-ID");

    if (!mime.startsWith('image/')) {
        return reply(`
₊ ׁ𖢷 ׄ ˚ *𝓤𝓢𝓐𝓖𝓔  𝓣𝓤𝓣𝓞𝓡* ! ᡣ𐭩 ࣪ 
      
🦢 ۫ ⑆ 𝖧𝖺𝗅𝗈 𝗄𝖺𝗄 @${m.sender.split('@')[0]}, 𝗌𝖾𝗉𝖾𝗋𝗍𝗂𝗇𝗒𝖺 𝗄𝖺𝗆𝗎 𝖻𝖾ল𝗎𝗆 𝗋𝖾𝗉𝗅𝗒 𝗀𝖺𝗆𝖻𝖺𝗋.

╭⠂「 \`𝖢𝖠𝖱𝖠 𝖯𝖠𝖪𝖠𝖨\` 」• ─
> │❒ *𝖱𝖾𝗉𝗅𝗒* 𝖿𝗈𝗍𝗈 𝗄𝖺𝗆𝗎
> │❒ *𝖪𝖾𝗍𝗂𝗄:* ${prefix + command} <prompt>
╰──────────────── •`.trim());
    }

    const prompt = args.join(' ');
    if (!prompt) return reply(`⚠️ *Prompt Required*\n\nContoh: ${prefix + command} jadi anime cyberpunk`);

    await Izuka.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    try {
        const buffer = await q.download();
        if (!buffer) return reply('❌ Gagal mendownload gambar dari chat.');

        const url = await UploadFileUgu(buffer);
        if (!url) return reply('❌ Gagal mengunggah gambar ke server uploader.');

        const initReq = `https://omegatech-api.dixonomega.tech/api/ai/nano-banana2?prompt=${encodeURIComponent(prompt)}&image=${encodeURIComponent(url)}`;
        const { data: initRes } = await axios.get(initReq);

        if (!initRes.success || !initRes.task_id) {
            throw new Error(initRes.message || 'API failed to initiate task.');
        }

        await reply('✨ *Processing...* Sedang merender gambarmu via Omegatech (30-60 detik).');

        const taskId = initRes.task_id;
        let resultUrl = null;
        let attempts = 0;

        while (!resultUrl && attempts < 25) {
            console.log(`[EditImg] Polling Task: ${taskId} | Attempt: ${attempts + 1}`);
            await new Promise(r => setTimeout(r, 5000));

            const { data: check } = await axios.get(
                `https://omegatech-api.dixonomega.tech/api/ai/nano-banana2-result?task_id=${taskId}`
            );

            if (check.success && check.status === 'completed' && check.image_url) {
                resultUrl = check.image_url;
                break;
            }
            
            if (check.status === 'failed') throw new Error('Server AI gagal memproses gambar ini.');
            
            attempts++;
        }

        if (!resultUrl) throw new Error('Waktu pemrosesan habis (Timeout).');

        await Izuka.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
        await Izuka.sendMessage(m.chat, {
            image: { url: resultUrl },
            caption: `
₊ ׁ𖢷 ׄ ˚ *𝓔𝓓𝓘𝓣  𝓡𝓔𝓢𝓤𝓛𝓣* ! ᡣ𐭩 ࣪ 

🦢 ۫ ⑆ 𝖧𝖺𝗅𝗈 𝗄𝖺𝗄 @${m.sender.split("@")[0]}, 𝗉𝗋𝗈𝗌𝖾𝗌 𝖾𝖽𝗂𝗍𝗂𝗇𝗀 𝗌𝖾𝗅𝖾𝗌𝖺𝗂:
> │❒ *𝖴𝗌𝖾𝗋:* ${m.pushName}
> │❒ *𝖯𝗋𝗈𝗆𝗉𝗍:* ${prompt}
> │❒ *𝖲𝗈𝗎𝗋𝖼𝖾:* Secreet

˚ 𓊆 𝗉𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 ${global.namabot} - ${calender} ♡ 𓊇`.trim(),
            mentions: [m.sender]
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        reply(`❌ *Error*: ${e.message}`);
        await Izuka.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    }
};

handler.help = ['editimg <prompt>'];
handler.command = ['editimg'];
handler.tags = ['ai'];
handler.register = true:

module.exports = handler;
