// 趋光性 - 机器水母产品卡
// p5.js 版本 - 完整的移动端适配

let canvasSize = 500;
let currentPage = 0;
const totalPages = 4;
let pageTransition = 0;
let isTransitioning = false;

// 动画参数
let jellyfishPulse = 0;

// 设备类型
let isMobile = false;
let isTablet = false;
let isSmallMobile = false;

function setup() {
    // 检测设备类型
    detectDevice();
    
    // 计算画布大小
    calculateCanvasSize();
    
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    canvas.style('display', 'block');
    
    // 禁用默认触摸行为
    canvas.elt.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    canvas.elt.addEventListener('touchmove', preventDefaultTouch, { passive: false });
    
    // 初始化文字位置
    updateTextPositions();
    
    // 绑定点击事件 - 同时支持鼠标和触摸
    canvas.mousePressed(handlePress);
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', () => {
        detectDevice();
        calculateCanvasSize();
        resizeCanvas(canvasSize, canvasSize);
        updateTextPositions();
    });
}

function preventDefaultTouch(e) {
    e.preventDefault();
}

function detectDevice() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    isSmallMobile = w <= 350;
    isMobile = w <= 768 || (w <= 900 && h > w);
    isTablet = w > 768 && w <= 1024;
}

function calculateCanvasSize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    // 留出边距给页码指示器
    let availableHeight = h - 80;
    let availableWidth = w - 40;
    
    // 画布为正方形，取较小值
    canvasSize = Math.min(availableWidth, availableHeight, 500);
    
    // 确保最小尺寸
    canvasSize = Math.max(canvasSize, 280);
}

function updateTextPositions() {
    const textLayer = document.getElementById('text-layer');
    if (!textLayer) return;
    
    textLayer.style.width = canvasSize + 'px';
    textLayer.style.height = canvasSize + 'px';
    
    // 根据设备类型调整文字位置
    if (isSmallMobile) {
        setSmallMobilePositions();
    } else if (isMobile) {
        setMobilePositions();
    } else if (isTablet) {
        setTabletPositions();
    } else {
        setDesktopPositions();
    }
}

// 超小屏幕位置设置
function setSmallMobilePositions() {
    const margin = canvasSize * 0.1;
    const centerX = canvasSize / 2;
    
    // 第1页
    setPos('p0-title', centerX, canvasSize * 0.25, 'center');
    setPos('p0-subtitle', centerX, canvasSize * 0.42, 'center');
    
    // 第2页 - 紧凑排列
    setPos('p1-t1', margin, canvasSize * 0.14, 'left');
    setPos('p1-t2', margin, canvasSize * 0.24, 'left');
    setPos('p1-t3', margin, canvasSize * 0.46, 'left');
    setPos('p1-t4', margin, canvasSize * 0.62, 'left');
    setPos('p1-t5', margin, canvasSize * 0.78, 'left');
    
    // 第3页
    setPos('p2-s1', margin, canvasSize * 0.12, 'left');
    setPos('p2-s2', margin, canvasSize * 0.40, 'left');
    setPos('p2-s3', margin, canvasSize * 0.68, 'left');
    
    // 第4页
    setPos('p3-text', centerX, canvasSize * 0.40, 'center');
    setPos('p3-sig', centerX, canvasSize * 0.60, 'center');
}

// 手机屏幕位置设置
function setMobilePositions() {
    const margin = canvasSize * 0.1;
    const centerX = canvasSize / 2;
    
    // 第1页
    setPos('p0-title', centerX, canvasSize * 0.26, 'center');
    setPos('p0-subtitle', centerX, canvasSize * 0.40, 'center');
    
    // 第2页
    setPos('p1-t1', margin, canvasSize * 0.14, 'left');
    setPos('p1-t2', margin, canvasSize * 0.24, 'left');
    setPos('p1-t3', margin, canvasSize * 0.46, 'left');
    setPos('p1-t4', margin, canvasSize * 0.62, 'left');
    setPos('p1-t5', margin, canvasSize * 0.78, 'left');
    
    // 第3页
    setPos('p2-s1', margin, canvasSize * 0.12, 'left');
    setPos('p2-s2', margin, canvasSize * 0.40, 'left');
    setPos('p2-s3', margin, canvasSize * 0.68, 'left');
    
    // 第4页
    setPos('p3-text', centerX, canvasSize * 0.40, 'center');
    setPos('p3-sig', centerX, canvasSize * 0.60, 'center');
}

// 平板位置设置
function setTabletPositions() {
    const margin = canvasSize * 0.12;
    const centerX = canvasSize / 2;
    
    // 第1页
    setPos('p0-title', centerX, canvasSize * 0.28, 'center');
    setPos('p0-subtitle', centerX, canvasSize * 0.42, 'center');
    
    // 第2页
    setPos('p1-t1', margin, canvasSize * 0.16, 'left');
    setPos('p1-t2', margin, canvasSize * 0.28, 'left');
    setPos('p1-t3', margin, canvasSize * 0.48, 'left');
    setPos('p1-t4', margin, canvasSize * 0.64, 'left');
    setPos('p1-t5', margin, canvasSize * 0.80, 'left');
    
    // 第3页
    setPos('p2-s1', margin, canvasSize * 0.14, 'left');
    setPos('p2-s2', margin, canvasSize * 0.42, 'left');
    setPos('p2-s3', margin, canvasSize * 0.70, 'left');
    
    // 第4页
    setPos('p3-text', centerX, canvasSize * 0.40, 'center');
    setPos('p3-sig', centerX, canvasSize * 0.60, 'center');
}

// 桌面位置设置
function setDesktopPositions() {
    const margin = canvasSize * 0.12;
    const centerX = canvasSize / 2;
    
    // 第1页
    setPos('p0-title', centerX, canvasSize * 0.28, 'center');
    setPos('p0-subtitle', centerX, canvasSize * 0.44, 'center');
    
    // 第2页
    setPos('p1-t1', margin, canvasSize * 0.18, 'left');
    setPos('p1-t2', margin, canvasSize * 0.30, 'left');
    setPos('p1-t3', margin, canvasSize * 0.50, 'left');
    setPos('p1-t4', margin, canvasSize * 0.66, 'left');
    setPos('p1-t5', margin, canvasSize * 0.82, 'left');
    
    // 第3页
    setPos('p2-s1', margin, canvasSize * 0.15, 'left');
    setPos('p2-s2', margin, canvasSize * 0.44, 'left');
    setPos('p2-s3', margin, canvasSize * 0.73, 'left');
    
    // 第4页
    setPos('p3-text', centerX, canvasSize * 0.40, 'center');
    setPos('p3-sig', centerX, canvasSize * 0.60, 'center');
}

function setPos(id, x, y, align) {
    const el = document.getElementById(id);
    if (!el) return;
    
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    
    if (align === 'center') {
        el.style.transform = 'translateX(-50%)';
        el.style.textAlign = 'center';
    } else {
        el.style.transform = 'none';
        el.style.textAlign = 'left';
    }
}

function draw() {
    background(10);
    
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
    
    // 绘制切换动画
    if (isTransitioning) {
        drawTransition();
    }
    
    pop();
    
    jellyfishPulse += 0.03;
}

function drawPage(page) {
    // 绘制细线边框
    noFill();
    stroke(255, 100);
    strokeWeight(0.5);
    
    let margin = canvasSize * 0.08;
    rect(margin, margin, canvasSize - margin * 2, canvasSize - margin * 2);
    
    switch(page) {
        case 0: drawCoverDecoration(); break;
        case 1: drawOriginDecoration(); break;
        case 2: drawCareDecoration(); break;
        case 3: drawBackDecoration(); break;
    }
}

// 第1页：封面装饰
function drawCoverDecoration() {
    push();
    translate(canvasSize / 2, canvasSize * 0.72);
    
    noFill();
    stroke(255, 120);
    strokeWeight(0.5);
    
    let scale = canvasSize / 500;
    scale(scale);
    
    // 水母身体
    beginShape();
    vertex(-50, -30);
    bezierVertex(-50, -60, 50, -60, 50, -30);
    bezierVertex(50, 0, 30, 15, 0, 15);
    bezierVertex(-30, 15, -50, 0, -50, -30);
    endShape();
    
    // 触手
    stroke(255, 80);
    strokeWeight(0.3);
    
    for (let i = 0; i < 4; i++) {
        let x = -35 + i * 23;
        beginShape();
        vertex(x, 10);
        bezierVertex(x, 30, x - 5 + i * 2, 50, x - 3 + i, 70);
        endShape();
    }
    
    // 发光核心
    let pulse = sin(jellyfishPulse) * 0.3 + 0.7;
    
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, -20, 8, 8);
    
    stroke(255, 60 * pulse);
    strokeWeight(0.3);
    ellipse(0, -20, 18, 18);
    
    stroke(255, 40 * pulse);
    strokeWeight(0.2);
    ellipse(0, -20, 30, 30);
    
    pop();
}

// 第2页：起源装饰
function drawOriginDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize * 0.75, canvasSize * 0.82);
    scale(scale * 0.7);
    
    noFill();
    stroke(255, 60);
    strokeWeight(0.4);
    
    for (let i = 0; i < 4; i++) {
        push();
        translate((i - 1.5) * 25, 0);
        ellipse(0, 15, 18, 10);
        
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

// 第3页：照料指南装饰
function drawCareDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize * 0.78, canvasSize * 0.18);
    scale(scale * 0.6);
    
    noFill();
    
    let x1 = -40, y1 = 0;
    let x2 = 40, y2 = 0;
    
    let pulse1 = sin(jellyfishPulse) * 0.4 + 0.6;
    let pulse2 = sin(jellyfishPulse + PI) * 0.4 + 0.6;
    
    stroke(255, 100 * pulse1);
    strokeWeight(0.5);
    ellipse(x1, y1, 10, 10);
    stroke(255, 50 * pulse1);
    strokeWeight(0.3);
    ellipse(x1, y1, 22, 22);
    
    stroke(255, 100 * pulse2);
    strokeWeight(0.5);
    ellipse(x2, y2, 10, 10);
    stroke(255, 50 * pulse2);
    strokeWeight(0.3);
    ellipse(x2, y2, 22, 22);
    
    stroke(255, 40);
    strokeWeight(0.3);
    
    drawingContext.setLineDash([4, 3]);
    beginShape();
    for (let a = 0; a <= PI; a += 0.1) {
        let x = map(a, 0, PI, x1 + 8, x2 - 8);
        let y = -sin(a) * 15;
        vertex(x, y);
    }
    endShape();
    
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

// 第4页：封底装饰
function drawBackDecoration() {
    push();
    
    let scale = canvasSize / 500;
    translate(canvasSize / 2, canvasSize * 0.72);
    scale(scale);
    
    noFill();
    
    let pulse = sin(jellyfishPulse * 0.8) * 0.3 + 0.7;
    
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, 0, 6, 6);
    
    stroke(255, 50 * pulse);
    strokeWeight(0.3);
    ellipse(0, 0, 20, 20);
    
    stroke(255, 35 * pulse);
    strokeWeight(0.2);
    ellipse(0, 0, 38, 38);
    
    stroke(255, 20 * pulse);
    strokeWeight(0.15);
    ellipse(0, 0, 60, 60);
    
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

function drawTransition() {
    push();
    let fadeAlpha = map(pageTransition, 0, 0.5, 255, 0);
    if (pageTransition > 0.5) {
        fadeAlpha = map(pageTransition, 0.5, 1, 0, 255);
    }
    
    noStroke();
    fill(10, fadeAlpha * 0.3);
    rect(0, 0, canvasSize, canvasSize);
    pop();
}

// 处理点击/触摸
function handlePress() {
    if (!isTransitioning) {
        isTransitioning = true;
        pageTransition = 0;
    }
    return false;
}

function mousePressed() {
    // 确保点击在画布内
    if (mouseX >= 0 && mouseX <= canvasSize && mouseY >= 0 && mouseY <= canvasSize) {
        handlePress();
    }
    return false;
}

function touchStarted() {
    // 触摸事件处理
    if (touches.length > 0) {
        let touch = touches[0];
        // 转换触摸坐标到画布坐标
        let canvasRect = canvas.elt.getBoundingClientRect();
        let tx = touch.x - canvasRect.left;
        let ty = touch.y - canvasRect.top;
        
        if (tx >= 0 && tx <= canvasSize && ty >= 0 && ty <= canvasSize) {
            handlePress();
        }
    }
    return false;
}

function updateTextVisibility() {
    for (let i = 0; i < totalPages; i++) {
        const pageEl = document.getElementById(`page-${i}`);
        if (pageEl) {
            if (i === currentPage) {
                pageEl.style.display = 'block';
                pageEl.style.opacity = '0';
                setTimeout(() => {
                    pageEl.style.transition = 'opacity 0.4s ease';
                    pageEl.style.opacity = '1';
                }, 50);
            } else {
                pageEl.style.display = 'none';
            }
        }
    }
}

function updatePageIndicator() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

// 键盘支持
function keyPressed() {
    if (key === ' ' || key === 'Enter' || keyCode === RIGHT_ARROW) {
        handlePress();
    } else if (keyCode === LEFT_ARROW) {
        if (!isTransitioning) {
            currentPage = (currentPage - 1 + totalPages) % totalPages;
            updateTextVisibility();
            updatePageIndicator();
        }
    }
}
