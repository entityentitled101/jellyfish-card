// 趋光性 - 机器水母产品卡
// 简单的交互效果

document.addEventListener('DOMContentLoaded', () => {
    // 页面加载时的淡入效果
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        page.style.opacity = '0';
        page.style.transform = 'translateY(10px)';
        page.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            page.style.opacity = '1';
            page.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // 鼠标悬停时的微妙光效
    const jellyfishGlows = document.querySelectorAll('.jellyfish-glow');
    
    document.querySelector('.page-cover')?.addEventListener('mouseenter', () => {
        jellyfishGlows.forEach(glow => {
            glow.style.filter = 'drop-shadow(0 0 3px rgba(255,255,255,0.5))';
        });
    });
    
    document.querySelector('.page-cover')?.addEventListener('mouseleave', () => {
        jellyfishGlows.forEach(glow => {
            glow.style.filter = 'none';
        });
    });
    
    // 点击页面时的微妙反馈
    pages.forEach(page => {
        page.addEventListener('click', () => {
            page.style.transform = 'scale(0.995)';
            setTimeout(() => {
                page.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    console.log('🎐 趋光性 Photo taxi - 一只笨拙的机器水母');
    console.log('它在找光，也许也在找你。');
});
