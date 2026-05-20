const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const convertBtn = document.getElementById('convertBtn');
const statusArea = document.getElementById('statusArea');
const statusMsg = document.getElementById('statusMsg');

dropZone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    if(e.target.files.length > 0) {
        document.getElementById('fileLabel').textContent = e.target.files[0].name;
        convertBtn.disabled = false;
    }
};

convertBtn.onclick = async () => {
    const file = fileInput.files[0];
    const format = document.getElementById('format').value;
    
    // 准备发送到后端的数据
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('targetFormat', format);

    // 显示加载状态
    convertBtn.disabled = true;
    statusArea.className = "status-show";
    statusMsg.textContent = "云端转换中，请勿关闭页面...";

    try {
        // 注意：这里的 URL 指向 Netlify 的后端函数
        const response = await fetch('/.netlify/functions/convert', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('转换失败');

        // 接收后端返回的文件流
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // 触发下载
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted_audio.${format}`;
        document.body.appendChild(a);
        a.click();
        
        statusMsg.textContent = "转换成功！已开始下载";
        statusArea.style.color = "#34c759";
    } catch (err) {
        statusMsg.textContent = "错误: " + err.message;
        statusArea.style.color = "#ff3b30";
    } finally {
        convertBtn.disabled = false;
    }
};
