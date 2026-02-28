// 趋光性 - 机器水母产品卡
// p5.js 版本 - 点击翻页

let canvasSize = 500;
let currentPage = 0;
const totalPages = 4;
let pageTransition = 0;
let isTransitioning = false;

// 动画参数
let jellyfishPulse = 0;
let lightRings = [];

function setup() {
    // 计算合适的画布大小
    canvasSize = min(windowWidth * 0.9, windowHeight * 0.75, 500);
    
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    
    // 设置画布样式
    canvas.style('display', 'block');
    
    // 初始化光信号环
    for (let i = 0; i < 3; i++) {
        lightRings.push({
            offset: i * TWO_PI / 3,
            speed: 0.02 + i * 0.01
        });
    }
    
    // 更新文字层大小
    updateTextLayerSize();
    
    // 绑定点击事件
    canvas.mousePressed(handleClick);
}

function windowResized() {
    canvasSize = min(windowWidth * 0.9, windowHeight * 0.75, 500);
    resizeCanvas(canvasSize, canvasSize);
    updateTextLayerSize();
}

function updateTextLayerSize() {
    const container = document.getElementById('canvas-container');
    const textLayer = document.getElementById('text-layer');
    if (container && textLayer) {
        textLayer.style.width = canvasSize + 'px';
        textLayer.style.height = canvasSize + 'px';
    }
}

function draw() {
    background(10);
    
    // 绘制当前页面的视觉元素
    push();
    
    // 页面切换动画
    if (isTransitioning) {
        pageTransition += 0.08;
        if (pageTransition >= 1) {
            pageTransition = 0;
            isTransitioning = false;
            currentPage = (currentPage + 1) % totalPages;
            updateTextVisibility();
            updatePageIndicator();
        }
    }
    
    // 绘制页面内容
    drawPage(currentPage);
    
    // 绘制切换动画效果
    if (isTransitioning) {
        drawTransition();
    }
    
    pop();
    
    // 更新水母脉冲动画
    jellyfishPulse += 0.03;
}

function drawPage(page) {
    // 绘制细线边框（只在画布上，不在文字层）
    noFill();
    stroke(255, 100);
    strokeWeight(0.5);
    
    let margin = canvasSize * 0.08;
    rect(margin, margin, canvasSize - margin * 2, canvasSize - margin * 2);
    
    // 根据页面绘制不同的视觉元素
    switch(page) {
        case 0:
            drawCoverDecoration();
            break;
        case 1:
            drawOriginDecoration();
            break;
        case 2:
            drawCareDecoration();
            break;
        case 3:
            drawBackDecoration();
            break;
    }
}

// 第1页：封面装饰 - 水母轮廓
function drawCoverDecoration() {
    push();
    translate(canvasSize / 2, canvasSize * 0.72);
    
    noFill();
    stroke(255, 120);
    strokeWeight(0.5);
    
    let scale = canvasSize / 500;
    scale(scale);
    
    // 水母身体 - 贝塞尔曲线
    beginShape();
    vertex(-50, -30);
    bezierVertex(-50, -60, 50, -60, 50, -30);
    bezierVertex(50, 0, 30, 15, 0, 15);
    bezierVertex(-30, 15, -50, 0, -50, -30);
    endShape();
    
    // 触手
    stroke(255, 80);
    strokeWeight(0.3);
    
    // 触手1
    beginShape();
    noFill();
    vertex(-35, 10);
    bezierVertex(-35, 30, -40, 50, -38, 70);
    endShape();
    
    // 触手2
    beginShape();
    vertex(-15, 15);
    bezierVertex(-15, 35, -18, 55, -15, 75);
    endShape();
    
    // 触手3
    beginShape();
    vertex(15, 15);
    bezierVertex(15, 35, 18, 55, 15, 75);
    endShape();
    
    // 触手4
    beginShape();
    vertex(35, 10);
    bezierVertex(35, 30, 40, 50, 38, 70);
    endShape();
    
    // 发光核心 - 脉冲效果
    let pulse = sin(jellyfishPulse) * 0.3 + 0.7;
    
    // 内圈
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, -20, 8, 8);
    
    // 中圈
    stroke(255, 60 * pulse);
    strokeWeight(0.3);
    ellipse(0, -20, 18, 18);
    
    // 外圈
    stroke(255, 40 * pulse);
    strokeWeight(0.2);
    ellipse(0, -20, 30, 30);
    
    pop();
}

// 第2页：起源装饰 - 四只小脚
function drawOriginDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize * 0.75, canvasSize * 0.82);
    scale(scale * 0.7);
    
    noFill();
    stroke(255, 60);
    strokeWeight(0.4);
    
    // 四只小脚的简化轮廓
    for (let i = 0; i < 4; i++) {
        push();
        translate((i - 1.5) * 25, 0);
        
        // 脚垫
        ellipse(0, 15, 18, 10);
        
        // 小腿线条
        stroke(255, 40);
        strokeWeight(0.3);
        let legCurve = sin(jellyfishPulse + i) * 5;
        beginShape();
        vertex(0, 10);
        vertex(legCurve, -5);
        vertex(legCurve * 0.5, -20);
        endShape();
        
        pop();
    }
    
    pop();
}

// 第3页：照料指南装饰 - 光信号
function drawCareDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize * 0.78, canvasSize * 0.18);
    scale(scale * 0.6);
    
    noFill();
    
    // 两个发光点之间的信号
    let x1 = -40, y1 = 0;
    let x2 = 40, y2 = 0;
    
    // 左发光点
    let pulse1 = sin(jellyfishPulse) * 0.4 + 0.6;
    stroke(255, 100 * pulse1);
    strokeWeight(0.5);
    ellipse(x1, y1, 10, 10);
    stroke(255, 50 * pulse1);
    strokeWeight(0.3);
    ellipse(x1, y1, 22, 22);
    
    // 右发光点
    let pulse2 = sin(jellyfishPulse + PI) * 0.4 + 0.6;
    stroke(255, 100 * pulse2);
    strokeWeight(0.5);
    ellipse(x2, y2, 10, 10);
    stroke(255, 50 * pulse2);
    strokeWeight(0.3);
    ellipse(x2, y2, 22, 22);
    
    // 信号线 - 虚线效果
    stroke(255, 40);
    strokeWeight(0.3);
    
    // 上弧线
    drawingContext.setLineDash([4, 3]);
    noFill();
    beginShape();
    for (let a = 0; a <= PI; a += 0.1) {
        let x = map(a, 0, PI, x1 + 8, x2 - 8);
        let y = -sin(a) * 15;
        vertex(x, y);
    }
    endShape();
    
    // 下弧线
    beginShape();
    for (let a = 0; a <= PI; a += 0.1) {
        let x = map(a, 0, PI, x1 + 8, x2 - 8);
        let y = sin(a) * 12;
        vertex(x, y);
    }
    endShape();
    
    drawingContext.setLineDash([]);
    
    pop();
}

// 第4页：封底装饰 - 光点放射
function drawBackDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize / 2, canvasSize * 0.72);
    scale(scale);
    
    noFill();
    
    let pulse = sin(jellyfishPulse * 0.8) * 0.3 + 0.7;
    
    // 中心光点
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, 0, 6, 6);
    
    // 同心圆环
    stroke(255, 50 * pulse);
    strokeWeight(0.3);
    ellipse(0, 0, 20, 20);
    
    stroke(255, 35 * pulse);
    strokeWeight(0.2);
    ellipse(0, 0, 38, 38);
    
    stroke(255, 20 * pulse);
    strokeWeight(0.15);
    ellipse(0, 0, 60, 60);
    
    // 放射线
    stroke(255, 30 * pulse);
    strokeWeight(0.15);
    
    for (let i = 0; i < 8; i++) {
        let angle = (TWO_PI / 8) * i + jellyfishPulse * 0.1;
        let r1 = 35;
        let r2 = 55;
        line(cos(angle) * r1, sin(angle) * r1, cos(angle) * r2, sin(angle) * r2);
    }
    
    pop();
}

// 页面切换动画
function drawTransition() {
    push();
    
    // 淡入淡出效果
    let fadeAlpha = map(pageTransition, 0, 0.5, 255, 0);
    if (pageTransition > 0.5) {
        fadeAlpha = map(pageTransition, 0.5, 1, 0, 255);
    }
    
    // 简单的渐变遮罩
    noStroke();
    fill(10, fadeAlpha * 0.3);
    rect(0, 0, canvasSize, canvasSize);
    
    pop();
}

function handleClick() {
    if (!isTransitioning) {
        isTransitioning = true;
        pageTransition = 0;
    }
}

function updateTextVisibility() {
    // 隐藏所有页面文字
    document.querySelectorAll('.page-text').forEach(el => {
        el.style.display = 'none';
    });
    
    // 显示当前页面文字
    const currentText = document.querySelector(`.page-text[data-page="${currentPage}"]`);
    if (currentText) {
        currentText.style.display = 'block';
        // 添加淡入动画
        currentText.style.opacity = '0';
        currentText.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            currentText.style.opacity = '1';
        }, 50);
    }
}

function updatePageIndicator() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 键盘支持
function keyPressed() {
    if (key === ' ' || key === 'Enter' || keyCode === RIGHT_ARROW) {
        handleClick();
    } else if (keyCode === LEFT_ARROW) {
        // 返回上一页
        if (!isTransitioning) {
            currentPage = (currentPage - 1 + totalPages) % totalPages;
            updateTextVisibility();
            updatePageIndicator();
        }
    }
}

// 触摸支持
function touchStarted() {
    handleClick();
    return false;
}
