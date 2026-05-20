// 注意：在实际商业环境中，这里会调用 ffmpeg
// 为了演示如何实现前后端通信，这里返回一个带有正确 Header 的响应
exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // 这里是后端逻辑：
        // 1. 解析 event.body 中的二进制音频
        // 2. 使用库（如 lamejs）进行编码
        // 3. 返回转换后的数据
        
        // 此处模拟后端处理，直接返回接收到的数据并伪装成 MP3 流
        // 这种方式在云端能有效触发 Safari 的下载弹窗
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": "attachment; filename=audio.mp3",
                "Access-Control-Allow-Origin": "*"
            },
            body: event.body, // 实际开发中这里是转换后的 Buffer
            isBase64Encoded: true
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
