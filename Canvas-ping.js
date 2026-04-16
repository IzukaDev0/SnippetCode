// Jangan lupa install module canvas


case 'ping': {
    
    function roundRect(ctx, x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        return ctx;
    }

    function drawGauge(ctx, x, y, radius, percent, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 10;
        ctx.stroke();

        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (Math.PI * 2 * (percent / 100));
        
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, radius - 8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 22px "Segoe UI", Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percent}%`, x, y);
        ctx.textAlign = 'left';
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function formatDuration(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        let result = '';
        if (days > 0) result += `${days}d `;
        if (hours > 0) result += `${hours}h `;
        if (minutes > 0) result += `${minutes}m `;
        result += `${secs}s`;
        return result;
    }

     
    const used = process.memoryUsage();
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memPercent = ((usedMem / totalMem) * 100).toFixed(1);
    
    const { execSync } = require('child_process');
    let diskRaw = 'Unknown';
    let diskInfo = {
        total: '-',
        used: '-',
        free: '-',
        percent: '-'
    };

    try {
        diskRaw = execSync("df -h --total | tail -n 1").toString().trim();
        const parts = diskRaw.split(/\s+/);
        diskInfo = {
            total: parts[1] || '-',
            used: parts[2] || '-',
            free: parts[3] || '-',
            percent: parts[4] || '-'
        };
    } catch (e) {
        console.log('Error getting disk info:', e.message);
    }

    const storagePercent = parseFloat(diskInfo.percent) || 0;
    
    let cpuTotal = 0;
    let cpuUsage = 0;
    
    cpus.forEach(cpu => {
        const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
        const idle = cpu.times.idle;
        cpuTotal += total;
        cpuUsage += (total - idle) / total * 100;
    });
    
    const cpuPercent = (cpuUsage / cpus.length).toFixed(1);
    
    let timestamp = speed();
    let latensi = speed() - timestamp;
    
    const runtimeBot = formatDuration(process.uptime());
    const runtimeServer = formatDuration(os.uptime());

    
    const { createCanvas } = require('canvas');
    
    const width = 900;      // ← Ubah untuk lebar (px)
    const height = 1000;    // ← Ubah untuk tinggi (px)
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    
    ctx.fillStyle = '#ffffff';  // ← Ubah untuk warna background
    ctx.fillRect(0, 0, width, height);

    
    const headerX = 40;
    const headerY = 70;

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 34px "Segoe UI", Arial';
    ctx.fillText('SYSTEM MONITOR', headerX, headerY);
    
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '16px "Segoe UI", Arial';
    ctx.fillText('Real-time Performance Dashboard', headerX, headerY + 35);

    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(headerX, headerY + 55);
    ctx.lineTo(width - headerX, headerY + 55);
    ctx.stroke();

    const cardStartY = 180;     // ← Geser semua card ke atas/bawah
    const gaugeCenterY = 310;   // ← Posisi tengah gauge
    
    const cardWidth = 250;       // ← Lebar setiap card
    const cardHeight = 280;      // ← Tinggi setiap card
    const cardSpacing = 30;      // ← Jarak antar card
    
    const startX = 45;           // ← Card pertama (CPU)
    const secondCardX = startX + cardWidth + cardSpacing;      // Card kedua (Memory)
    const thirdCardX = secondCardX + cardWidth + cardSpacing;  // Card ketiga (Storage)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    roundRect(ctx, startX, cardStartY, cardWidth, cardHeight, 20);
    ctx.fill();

    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 18px "Segoe UI", Arial';
    ctx.fillText('CPU USAGE', startX + 20, cardStartY + 35);

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '13px "Segoe UI", Arial';
    ctx.fillText(`${cpus.length} Cores @ ${Math.round(cpus[0].speed)} MHz`, startX + 20, cardStartY + 60);

    drawGauge(ctx, startX + cardWidth/2, gaugeCenterY, 55, cpuPercent, '#3498db');

    ctx.fillStyle = '#95a5a6';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.textAlign = 'center';
    let cpuModel = cpus[0].model;
    if (cpuModel.length > 28) cpuModel = cpuModel.substring(0, 25) + '...';
    ctx.fillText(cpuModel, startX + cardWidth/2, gaugeCenterY + 80);
    ctx.textAlign = 'left';

    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    roundRect(ctx, secondCardX, cardStartY, cardWidth, cardHeight, 20);
    ctx.fill();

    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 18px "Segoe UI", Arial';
    ctx.fillText('MEMORY', secondCardX + 20, cardStartY + 35);

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '13px "Segoe UI", Arial';
    ctx.fillText(`Total: ${formatBytes(totalMem)}`, secondCardX + 20, cardStartY + 60);

    drawGauge(ctx, secondCardX + cardWidth/2, gaugeCenterY, 55, memPercent, '#e67e22');

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.fillText('USED', secondCardX + 50, gaugeCenterY + 65);
    ctx.fillText('FREE', secondCardX + 150, gaugeCenterY + 65);

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 13px "Segoe UI", Arial';
    ctx.fillText(formatBytes(usedMem), secondCardX + 50, gaugeCenterY + 90);
    ctx.fillText(formatBytes(freeMem), secondCardX + 150, gaugeCenterY + 90);

    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    roundRect(ctx, thirdCardX, cardStartY, cardWidth, cardHeight, 20);
    ctx.fill();

    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 18px "Segoe UI", Arial';
    ctx.fillText('STORAGE', thirdCardX + 20, cardStartY + 35);

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '13px "Segoe UI", Arial';
    ctx.fillText(`Total: ${diskInfo.total}`, thirdCardX + 20, cardStartY + 60);

    drawGauge(ctx, thirdCardX + cardWidth/2, gaugeCenterY, 55, storagePercent, '#27ae60');

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.fillText('USED', thirdCardX + 50, gaugeCenterY + 65);
    ctx.fillText('FREE', thirdCardX + 150, gaugeCenterY + 65);

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 13px "Segoe UI", Arial';
    ctx.fillText(diskInfo.used, thirdCardX + 50, gaugeCenterY + 90);
    ctx.fillText(diskInfo.free, thirdCardX + 150, gaugeCenterY + 90);

    const barX = thirdCardX + 30;
    const barY = gaugeCenterY + 110;
    const barWidth = cardWidth - 60;
    const barHeight = 6;

    ctx.fillStyle = '#e9ecef';
    ctx.beginPath();
    roundRect(ctx, barX, barY, barWidth, barHeight, 3);
    ctx.fill();

    const barProgress = barWidth * (storagePercent / 100);
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    roundRect(ctx, barX, barY, barProgress, barHeight, 3);
    ctx.fill();

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '10px "Segoe UI", Arial';
    ctx.fillText('Disk Usage', barX, barY - 5);
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 10px "Segoe UI", Arial';
    ctx.fillText(`${storagePercent}%`, barX + barWidth + 8, barY + 4);

    
    const sysCardY = 520;      // ← Geser card System Info ke atas/bawah
    
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    roundRect(ctx, 40, sysCardY, width - 80, 120, 20);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 18px "Segoe UI", Arial';
    ctx.fillText('SYSTEM INFORMATION', 60, sysCardY + 35);
    const colWidth = (width - 120) / 4;
    const col1 = 60;
    const col2 = col1 + colWidth;
    const col3 = col2 + colWidth;
    const col4 = col3 + colWidth;
    const infoY1 = sysCardY + 70;
    const infoY2 = sysCardY + 100;

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.fillText('Hostname', col1, infoY1);
    ctx.fillText('Platform', col2, infoY1);
    ctx.fillText('Bot Uptime', col3, infoY1);
    ctx.fillText('Server Uptime', col4, infoY1);

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px "Segoe UI", Arial';
    ctx.fillText(os.hostname().substring(0, 12), col1, infoY2);
    ctx.fillText(os.platform(), col2, infoY2);
    ctx.fillText(runtimeBot, col3, infoY2);
    ctx.fillText(runtimeServer, col4, infoY2);

    const nodeCardY = 670;     // ← Geser card Node.js Memory ke atas/bawah
    
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    roundRect(ctx, 40, nodeCardY, width - 80, 120, 20);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 18px "Segoe UI", Arial';
    ctx.fillText('NODE.JS MEMORY', 60, nodeCardY + 35);

    const memCol1 = 60;
    const memCol2 = memCol1 + colWidth;
    const memCol3 = memCol2 + colWidth;
    const memCol4 = memCol3 + colWidth;
    const memY1 = nodeCardY + 70;
    const memY2 = nodeCardY + 100;

    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.fillText('RSS', memCol1, memY1);
    ctx.fillText('Heap Total', memCol2, memY1);
    ctx.fillText('Heap Used', memCol3, memY1);
    ctx.fillText('External', memCol4, memY1);

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 14px "Segoe UI", Arial';
    ctx.fillText(formatBytes(used.rss), memCol1, memY2);
    ctx.fillText(formatBytes(used.heapTotal), memCol2, memY2);
    ctx.fillText(formatBytes(used.heapUsed), memCol3, memY2);
    ctx.fillText(formatBytes(used.external), memCol4, memY2);

    
    const footerY = 820;
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, footerY);
    ctx.lineTo(width - 40, footerY);
    ctx.stroke();
    
    ctx.fillStyle = '#95a5a6';
    ctx.font = '12px "Segoe UI", Arial';
    ctx.fillText(`Generated: ${new Date().toLocaleString('id-ID')}`, 40, footerY + 30);

    const pingX = width - 140;  // ← Geser horizontal
    const pingY = footerY + 15; // ← Geser vertikal
    
    ctx.fillStyle = '#3498db';
    ctx.beginPath();
    roundRect(ctx, pingX, pingY, 100, 35, 18);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Segoe UI", Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${latensi.toFixed(2)} ms`, pingX + 50, pingY + 24);
    ctx.textAlign = 'left';

    const buffer = canvas.toBuffer();

    // Kirim gambar
    await Izuka.sendMessage(m.chat, {
        image: buffer,
        caption: `📊 *System Status*\nResponse: ${latensi.toFixed(2)} ms`
    }, { quoted: m });
}
break;
