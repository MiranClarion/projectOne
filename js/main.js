// 获取DOM元素
const tabItems = document.querySelectorAll('.tab-item');
const studentInfo = document.querySelector('.student-info');
const searchInput = document.querySelector('.search-input');
const searchClear = document.querySelector('.search-clear');

// 学生信息数据
const studentData = {
    sno: '3232508210',
    name: '欧章磊',
    department: '计算机与大数据学院',
    grade: '大2',
    courses: [
        { name: 'web开发', score: 92 },
        { name: '线性代数', score: 88 },
        { name: '母猪的产后护理', score: 95 }
    ]
};

// 更新内容区域显示
function updateContent(tabIndex) {
    // 清空当前内容，准备添加新内容
    studentInfo.innerHTML = '';
    
    // 延迟一小段时间再添加内容，创建过渡效果
    setTimeout(() => {
        let content = '';
        
        switch(tabIndex) {
            case 0: // 首页
                content = `
                    <h3 class="card-title">学生基本信息</h3>
                    <div class="info-item">
                        <span class="label">学号</span>
                        <span class="value">${studentData.sno}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">姓名</span>
                        <span class="value">${studentData.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">院系</span>
                        <span class="value">${studentData.department}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">年级</span>
                        <span class="value">${studentData.grade}</span>
                    </div>
                `;
                break;
                
            case 1: // 消息页面
                content = `
                    <h3 class="card-title">消息中心</h3>
                    <div class="info-item">
                        <span class="label">系统通知</span>
                        <span class="value">您有一条新的系统通知</span>
                    </div>
                    <div class="message-preview">
                        <div class="message-icon"><i class="ri-notification-4-line"></i></div>
                        <div class="message-content">
                            <div class="message-title">选课通知</div>
                            <div class="message-text">下周一开始新学期选课，请及时登录教务系统</div>
                            <div class="message-time">今天 10:30</div>
                        </div>
                    </div>
                `;
                break;
                
            case 2: // 购物车
                content = `
                    <h3 class="card-title">购物车</h3>
                    <div class="empty-state">
                        <i class="ri-shopping-cart-line"></i>
                        <p>购物车还是空的</p>
                        <button class="btn-primary">去选购</button>
                    </div>
                `;
                break;
                
            case 3: // 个人页面
                content = `
                    <div class="profile-header">
                        <div class="avatar">
                            <span>${studentData.name.charAt(0)}</span>
                        </div>
                        <h2>${studentData.name}</h2>
                        <p>${studentData.department} · ${studentData.grade}</p>
                    </div>
                    <div class="info-item">
                        <span class="label">学号</span>
                        <span class="value">${studentData.sno}</span>
                    </div>
                    <h3 class="section-title">课程成绩</h3>
                    <div class="course-list">
                        ${studentData.courses.map(course => `
                            <div class="course-item">
                                <div class="course-name">${course.name}</div>
                                <div class="course-score">${course.score}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
        }
        
        studentInfo.innerHTML = content;
        
        // 添加内容后触发动画
        const infoItems = studentInfo.querySelectorAll('.info-item');
        infoItems.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.1}s`;
        });
    }, 50);
}

// 标签切换事件处理
tabItems.forEach(item => {
    item.addEventListener('click', function() {
        const tabIndex = parseInt(this.getAttribute('data-tab'));
        
        // 更新标签状态
        tabItems.forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        
        // 更新内容
        updateContent(tabIndex);
        
        // 添加轻微震动反馈（如果设备支持）
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
});

// 搜索框处理
searchInput.addEventListener('input', function() {
    if (this.value) {
        searchClear.style.opacity = '1';
    } else {
        searchClear.style.opacity = '0';
    }
});

searchClear.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.focus();
    this.style.opacity = '0';
});

// 初始化显示首页内容
updateContent(0);

document.addEventListener('DOMContentLoaded', () => {
  // 检查系统主题首选项
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 检查用户之前设置的主题偏好
  const currentTheme = localStorage.getItem('theme');
  
  // 根据本地存储或系统偏好设置当前主题
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.getElementById('theme-toggle').checked = true;
    }
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('theme-toggle').checked = true;
  }
  
  // 主题切换处理 - 添加Fluent风格的过渡动画
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('change', () => {
    // 添加过渡类以实现平滑主题切换
    document.body.classList.add('theme-transition');
    
    // 添加Fluent风格的淡入淡出效果
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = themeToggle.checked ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(overlay);
    
    // 执行淡入
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // 延迟切换主题
    setTimeout(() => {
      if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      
      // 触觉反馈
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      // 淡出并移除遮罩
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300);
      }, 100);
    }, 150);
  });

  // Fluent设计的标签指示器
  const tabIndicator = document.querySelector('.tab-indicator');
  const updateIndicator = (activeTab) => {
    const tabRect = activeTab.getBoundingClientRect();
    const navRect = document.querySelector('.tab-navigation').getBoundingClientRect();
    
    // 添加缓冲动画效果
    tabIndicator.style.width = `${tabRect.width * 0.6}px`;
    tabIndicator.style.left = `${tabRect.left - navRect.left + (tabRect.width * 0.2)}px`;
  };

  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      updateIndicator(this);
    });
  });

  updateIndicator(document.querySelector('.tab-item.active'));

  let lastScrollPosition = 0;
  const header = document.querySelector('.search-container');
  document.querySelector('.content-scroll').addEventListener('scroll', () => {
    const currentScroll = document.querySelector('.content-scroll').scrollTop;
    if (currentScroll > lastScrollPosition && currentScroll > 50) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    lastScrollPosition = currentScroll;
  });

  // 使用页面加载效果
  setTimeout(() => {
    document.querySelector('.page-transition-wrapper').classList.add('page-transition-enter-active');
  }, 100);
  
  // Fluent焦点效果
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('focus', () => {
    document.querySelector('.search-wrapper').style.boxShadow = 
      document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'var(--shadow-focus-dark)' 
        : 'var(--shadow-focus)';
  });
  
  searchInput.addEventListener('blur', () => {
    document.querySelector('.search-wrapper').style.boxShadow = '';
  });
});