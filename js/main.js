// 获取页面上的DOM元素：标签页和信息展示区域
const tabItems = document.querySelectorAll('.tab-item');
const infoSection = document.querySelector('.info-section');

// 定义学生基本信息对象
const studentInfo = {
    sno: '3232508202',  // 学号
    name: '王熠亮'      // 姓名
};

// 更新内容区域的函数
// @param tabIndex: 当前选中的标签页索引
function updateContent(tabIndex) {
    let content = '';
    
    // 根据不同的标签页索引显示不同的内容
    switch(tabIndex) {
        case 0: // 首页：显示学生基本信息
            content = `
                <div class="info-item">
                    <span class="label">学号：</span>
                    <span class="value">${studentInfo.sno}</span>
                </div>
                <div class="info-item">
                    <span class="label">姓名：</span>
                    <span class="value">${studentInfo.name}</span>
                </div>
            `;
            break;
        case 1: // 消息页面：显示消息提醒
            content = `
                <div class="info-item">
                    <span class="label">消息提醒</span>
                    <span class="value">暂无新消息</span>
                </div>
            `;
            break;
        case 2: // 购物车页面：显示购物车信息
            content = `
                <div class="info-item">
                    <span class="label">购物车</span>
                    <span class="value">暂无商品</span>
                </div>
                <div class="info-item">
                    <span class="label">总计</span>
                    <span class="value">¥0.00</span>
                </div>
            `;
            break;
        case 3: // 个人页面：显示详细个人信息
            content = `
                <div class="info-item">
                    <span class="label">个人信息</span>
                    <span class="value">${studentInfo.name}</span>
                </div>
                <div class="info-item">
                    <span class="label">学号</span>
                    <span class="value">${studentInfo.sno}</span>
                </div>
            `;
            break;
    }
    
    // 将生成的内容更新到页面
    infoSection.innerHTML = content;
}

// 为每个标签页添加点击事件监听器
tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // 移除所有标签页的active类
        tabItems.forEach(tab => tab.classList.remove('active'));
        // 为当前点击的标签页添加active类
        item.classList.add('active');
        // 更新内容区域显示
        updateContent(index);
    });
});

// 初始化页面时显示首页内容
updateContent(0);