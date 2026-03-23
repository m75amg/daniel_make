/**
 * Make 2.0 — main.js
 * Bootstrap v5.3.3 + jQuery v3.7.1
 *
 * Header/Footer HTML is inlined here so the site works when opened
 * directly via file:// without a local dev server.
 */

/* ── Partial HTML strings ────────────────────────────────────*/
var HEADER_HTML = `<!-- ===== PLATFORM HEADER ===== -->
<header id="platform-header" class="bg-white border-bottom sticky-top shadow-sm">

  <!-- Top Bar -->
  <div class="border-bottom border-light">
    <div class="container-xl">
      <div class="d-flex align-items-center justify-content-between" style="height:36px;">
        <small class="text-muted" id="header-date"></small>
        <div class="d-flex align-items-center gap-3">
          <a href="login.html"   class="text-secondary text-decoration-none small header-toplink auth-loggedout-only">로그인</a>
          <a href="signup.html"  class="text-secondary text-decoration-none small header-toplink auth-loggedout-only">회원가입</a>
          <a href="support.html" class="text-secondary text-decoration-none small header-toplink">고객센터</a>
          <a href="#"            class="text-secondary text-decoration-none small header-toplink">홈사이트</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Nav -->
  <div class="container-xl">
    <nav class="navbar navbar-expand-lg px-0" style="min-height:64px;">

      <!-- Logo -->
      <a class="navbar-brand fw-bold fs-5 me-4" href="index.html">
        <span class="text-dark">e</span><span class="text-warning">4</span><span class="text-dark">ds</span>
        <span class="fw-normal text-secondary ms-1" style="font-size:1.1rem;">make</span>
      </a>

      <!-- Mobile toggler -->
      <button class="navbar-toggler ms-auto" type="button"
              data-bs-toggle="collapse" data-bs-target="#mainNavCollapse"
              aria-controls="mainNavCollapse" aria-expanded="false" aria-label="메뉴 열기">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNavCollapse">

        <!-- Center Links -->
        <ul class="navbar-nav me-auto gap-lg-1">

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-medium text-dark" href="#"
               data-bs-toggle="dropdown">News</a>
            <ul class="dropdown-menu shadow-sm border-0">
              <li><a class="dropdown-item" href="#">최신 뉴스</a></li>
              <li><a class="dropdown-item" href="notices.html">공지사항</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-medium text-dark" href="#"
               data-bs-toggle="dropdown">Technologies</a>
            <ul class="dropdown-menu shadow-sm border-0">
              <li><a class="dropdown-item" href="#">임베디드</a></li>
              <li><a class="dropdown-item" href="#">IoT</a></li>
              <li><a class="dropdown-item" href="#">AI/ML</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-medium text-dark" href="#"
               data-bs-toggle="dropdown">Industries</a>
            <ul class="dropdown-menu shadow-sm border-0">
              <li><a class="dropdown-item" href="#">자동차</a></li>
              <li><a class="dropdown-item" href="#">의료</a></li>
              <li><a class="dropdown-item" href="#">산업자동화</a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link fw-medium text-dark" href="events.html">EEWebinar</a>
          </li>

          <li class="nav-item dropdown" id="makers-zone-dropdown">
            <a class="nav-link dropdown-toggle fw-medium text-dark" href="#"
               data-bs-toggle="dropdown">Maker's Zone</a>
            <ul class="dropdown-menu shadow-sm border-0" style="min-width:160px;">
              <li><a class="dropdown-item" href="projects.html">프로젝트</a></li>
              <li><a class="dropdown-item" href="contests.html">콘테스트</a></li>
              <li><a class="dropdown-item" href="community.html">커뮤니티</a></li>
              <li><a class="dropdown-item" href="my-make.html">마이메이크</a></li>
            </ul>
          </li>
        </ul>

        <!-- Right Actions -->
        <div class="d-flex align-items-center gap-2 ms-lg-2">
          <button class="btn btn-light btn-sm p-2 rounded-3" id="header-search-btn" title="검색">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button class="btn btn-light btn-sm p-2 rounded-3" id="header-user-btn" title="프로필">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>

      </div><!-- /collapse -->
    </nav>
  </div>

  <!-- Search Bar (hidden by default) -->
  <div id="header-search-bar" class="border-top bg-light d-none">
    <div class="container-xl py-2">
      <form class="d-flex gap-2" id="header-search-form">
        <input type="search" class="form-control form-control-sm"
               placeholder="검색어를 입력하세요..." id="header-search-input">
        <button type="submit" class="btn btn-primary btn-sm px-3">검색</button>
        <button type="button" class="btn btn-light btn-sm" id="header-search-close">닫기</button>
      </form>
    </div>
  </div>

</header>`;

var FOOTER_HTML = `<!-- ===== PLATFORM FOOTER ===== -->
<footer id="platform-footer">

  <!-- Sponsor Logos -->
  <div class="bg-light border-top border-bottom py-4">
    <div class="container-xl">
      <p class="text-center text-muted small mb-3">Sponsored Company</p>
      <div class="d-flex flex-wrap align-items-center justify-content-center gap-4">
        <span class="fw-medium text-secondary small">CREAFORM</span>
        <span class="fw-medium text-secondary small">Infineon</span>
        <span class="fw-bold text-dark small">KETI</span>
        <span class="fw-medium text-secondary small">KEYSIGHT</span>
        <span class="fw-medium text-secondary small">Microchip</span>
        <span class="fw-medium text-primary small">mouser.com</span>
        <span class="fw-medium text-secondary small">NATIONAL INSTRUMENTS</span>
        <span class="fw-bold text-white bg-danger px-2 py-1 rounded small">ROHM</span>
        <span class="fw-medium text-secondary small">ST</span>
        <span class="fw-medium text-dark small">Tektronix</span>
      </div>
    </div>
  </div>

  <!-- Company Info -->
  <div class="bg-black text-secondary py-5">
    <div class="container-xl">

      <!-- Links Row -->
      <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center
                  justify-content-between gap-3 mb-4">
        <div class="d-flex flex-wrap align-items-center gap-2 small">
          <a href="support.html"  class="footer-link text-secondary text-decoration-none">e4ds 소개</a>
          <span class="text-muted">|</span>
          <a href="notices.html"  class="footer-link text-secondary text-decoration-none">개인정보처리방침</a>
          <span class="text-muted">|</span>
          <a href="faq.html"      class="footer-link text-secondary text-decoration-none">이용약관</a>
          <span class="text-muted">|</span>
          <a href="contact.html"  class="footer-link text-secondary text-decoration-none">청소년보호정책</a>
          <span class="text-muted">|</span>
          <a href="careers.html"  class="footer-link text-secondary text-decoration-none">가족사이트</a>
          <span class="text-muted">|</span>
          <a href="#"             class="footer-link text-secondary text-decoration-none">저작권</a>
          <span class="text-muted">|</span>
          <a href="#"             class="footer-link text-secondary text-decoration-none">e4ds인터내셔널</a>
        </div>
      </div>

      <!-- Company Details -->
      <div class="small text-muted lh-lg">
        <p class="mb-1">(주)디지털데일리 | 등록번호 : 경기 아51470 | 등록: 2008.10.20 | 발행: 2026.05.19 | 표: 김제호</p>
        <p class="mb-1">주소 : 경기도 성남시 분당구 대왕판교로 660번길 8 | 전화 : 02-883-9797 | 팩스 : 02-6280-9957</p>
        <p class="mb-1 text-secondary" style="opacity:.6;">
          본 콘텐츠의 저작권은 (주)디지털데일리에 있으며 무단 전재 및 재배포를 금지합니다.
        </p>
        <p class="mt-3 mb-0">Copyright &copy; 2026 e4ds News. All Rights Reserved</p>
      </div>

    </div>
  </div>

</footer>`;

/* ── Resolve base URL of current page's directory ───────────*/
function getBaseUrl() {
  return window.location.href.replace(/\/[^/?#]*([?#].*)?$/, '/');
}

/* ── Convert relative hrefs to absolute (needed for file://) */
function fixLinks($container) {
  var base = getBaseUrl();
  $container.find('a[href]').each(function () {
    var href = $(this).attr('href');
    if (href && href !== '#'
        && !href.startsWith('file://')
        && !href.startsWith('http')
        && !href.startsWith('/')
        && !href.startsWith('?')
        && !href.startsWith('#')) {
      $(this).attr('href', base + href);
    }
  });
}

/* ── Auth ────────────────────────────────────────────────────
   Lightweight auth layer.  Uses localStorage for session state.
   Works fully on file:// without a backend.
   ─────────────────────────────────────────────────────────── */
var Auth = (function () {
  var KEY = 'make_auth_user';
  var _pendingCb  = null;
  var _isPageGate = false;

  /* ── state ─────────────────────────────────────────────── */
  function isLoggedIn() { return !!localStorage.getItem(KEY); }
  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }
  function login(user)  { localStorage.setItem(KEY, JSON.stringify(user)); }
  function logout() {
    localStorage.removeItem(KEY);
    window.location.href = getBaseUrl() + 'index.html';
  }

  /* ── gates ─────────────────────────────────────────────── */
  // Action gate: shows modal, calls cb() after login. Dismissed = just close.
  function requireLogin(cb) {
    if (isLoggedIn()) { if (cb) cb(); return; }
    _isPageGate = false;
    _pendingCb  = cb || null;
    _show();
  }

  // Page gate: shows modal; after login = reload; dismissed = history.back().
  function requirePage() {
    if (isLoggedIn()) return;
    _isPageGate = true;
    sessionStorage.setItem('make_return_url', window.location.href);
    _pendingCb  = function () { window.location.reload(); };
    _show();
  }

  /* ── modal show / hide ─────────────────────────────────── */
  function _show() {
    _ensureModal();
    var bg   = document.getElementById('auth-modal-bg');
    var box  = document.getElementById('auth-modal-box');
    var xBtn = document.getElementById('auth-modal-close');
    var dismissFn = _isPageGate ? function () { window.history.back(); } : _hide;
    bg.onclick   = dismissFn;
    xBtn.onclick = dismissFn;
    bg.style.display  = 'block';
    box.style.display = 'block';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bg.classList.add('show');
        box.classList.add('show');
      });
    });
    document.body.style.overflow = 'hidden';
  }

  function _hide() {
    var bg  = document.getElementById('auth-modal-bg');
    var box = document.getElementById('auth-modal-box');
    if (!bg) return;
    bg.classList.remove('show');
    box.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function () {
      bg.style.display  = 'none';
      box.style.display = 'none';
    }, 220);
  }

  /* ── login action ──────────────────────────────────────── */
  function _doLogin(email, name) {
    login({ email: email, name: name || email.split('@')[0] });
    _hide();
    syncHeader();
    if (_pendingCb) {
      var cb = _pendingCb;
      _pendingCb = null;
      setTimeout(cb, 260);
    }
  }

  /* ── header sync ───────────────────────────────────────── */
  function syncHeader() {
    var user = getUser();
    $('#auth-header-user').remove();

    if (!user) {
      $('.auth-loggedout-only').show();
      return;
    }
    // Logged in: hide login/signup, inject user info
    $('.auth-loggedout-only').hide();
    var name = user.name || user.email || '메이커';
    var html =
      '<span id="auth-header-user" class="d-flex align-items-center gap-2">' +
        '<span class="small text-muted" style="font-size:.79rem;">' + name + '님</span>' +
        '<button onclick="Auth.logout()" ' +
          'class="btn btn-link btn-sm p-0 text-muted" ' +
          'style="font-size:.79rem;text-decoration:none;">로그아웃</button>' +
      '</span>';
    // Insert after last .auth-loggedout-only link in top bar
    var $last = $('#platform-header .auth-loggedout-only').last();
    if ($last.length) { $last.after(html); }
    else { $('#platform-header .d-flex.gap-3').append(html); }
  }

  /* ── modal DOM injection ───────────────────────────────── */
  function _ensureModal() {
    if (document.getElementById('auth-modal-bg')) return;
    var base = getBaseUrl();

    // ── CSS ──
    var s = document.createElement('style');
    s.textContent =
      '#auth-modal-bg{display:none;position:fixed;inset:0;z-index:9000;' +
        'background:rgba(0,0,0,.52);opacity:0;transition:opacity .22s;}' +
      '#auth-modal-bg.show{opacity:1;}' +
      '#auth-modal-box{display:none;position:fixed;top:50%;left:50%;' +
        'transform:translate(-50%,-55%);z-index:9001;width:92%;max-width:440px;' +
        'background:#fff;border-radius:1.25rem;' +
        'box-shadow:0 24px 60px rgba(0,0,0,.22);' +
        'opacity:0;transition:transform .25s,opacity .25s;}' +
      '#auth-modal-box.show{transform:translate(-50%,-50%);opacity:1;}' +
      '.auth-soc-btn{display:flex;align-items:center;justify-content:center;gap:.5rem;' +
        'width:100%;padding:.65rem 1rem;border-radius:.5rem;font-size:.9rem;' +
        'font-weight:500;border:1.5px solid #e5e7eb;background:#fff;cursor:pointer;' +
        'transition:background .15s;}' +
      '.auth-soc-btn:hover{background:#f9fafb;}' +
      '.auth-soc-btn.kakao{background:#FEE500!important;border-color:#F0D800!important;}';
    document.head.appendChild(s);

    // ── HTML ──
    var html =
      '<div id="auth-modal-bg"></div>' +
      '<div id="auth-modal-box">' +

        // header
        '<div style="padding:1.75rem 1.75rem 0;">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.4rem;">' +
            '<div>' +
              '<div style="font-size:1.15rem;font-weight:700;color:#111;">로그인이 필요합니다</div>' +
              '<div style="font-size:.83rem;color:#6b7280;margin-top:.2rem;">e4ds make 계정으로 계속하세요</div>' +
            '</div>' +
            '<button id="auth-modal-close" style="background:none;border:none;font-size:1.3rem;' +
              'cursor:pointer;color:#9ca3af;line-height:1;padding:0;flex-shrink:0;">✕</button>' +
          '</div>' +

          // social buttons
          '<div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.1rem;">' +
            '<button class="auth-soc-btn kakao" onclick="Auth._social(\'kakao\')">' +
              '<svg width="18" height="18" viewBox="0 0 40 40">' +
                '<path d="M20 4C11.163 4 4 9.818 4 17c0 4.628 2.93 8.686 7.364 11.11' +
                  'L9.6 35.2l7.73-5.12C18.42 30.352 19.2 30.4 20 30.4' +
                  'c8.837 0 16-5.818 16-13S28.837 4 20 4z" fill="#3A1D1D"/>' +
              '</svg>카카오로 로그인' +
            '</button>' +
            '<button class="auth-soc-btn" onclick="Auth._social(\'google\')">' +
              '<svg width="18" height="18" viewBox="0 0 24 24">' +
                '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>' +
                '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>' +
                '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>' +
                '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>' +
              '</svg>Google로 로그인' +
            '</button>' +
          '</div>' +

          // divider
          '<div style="display:flex;align-items:center;margin-bottom:1rem;">' +
            '<hr style="flex:1;margin:0;border-color:#e5e7eb;">' +
            '<span style="padding:0 .65rem;font-size:.8rem;color:#9ca3af;">또는 이메일로</span>' +
            '<hr style="flex:1;margin:0;border-color:#e5e7eb;">' +
          '</div>' +

          // error
          '<div id="auth-modal-err" style="display:none;padding:.45rem .7rem;' +
            'background:#fef2f2;border-radius:.4rem;color:#dc2626;font-size:.82rem;margin-bottom:.6rem;"></div>' +

          // inputs
          '<div style="margin-bottom:.6rem;">' +
            '<input type="email" id="auth-modal-email" placeholder="이메일" ' +
              'style="width:100%;padding:.6rem .85rem;border:1.5px solid #e5e7eb;' +
              'border-radius:.5rem;font-size:.88rem;box-sizing:border-box;outline:none;">' +
          '</div>' +
          '<div style="margin-bottom:.9rem;">' +
            '<input type="password" id="auth-modal-pw" placeholder="비밀번호" ' +
              'style="width:100%;padding:.6rem .85rem;border:1.5px solid #e5e7eb;' +
              'border-radius:.5rem;font-size:.88rem;box-sizing:border-box;outline:none;">' +
          '</div>' +
          '<button onclick="Auth._emailLogin()" ' +
            'style="width:100%;padding:.68rem;background:#2563eb;color:#fff;border:none;' +
            'border-radius:.5rem;font-weight:700;font-size:.92rem;cursor:pointer;">로그인</button>' +
        '</div>' +

        // footer
        '<div style="padding:.85rem 1.75rem 1.4rem;text-align:center;">' +
          '<span style="font-size:.83rem;color:#6b7280;">계정이 없으신가요? </span>' +
          '<a href="' + base + 'signup.html" style="font-size:.83rem;color:#2563eb;font-weight:600;text-decoration:none;">회원가입</a>' +
          '<span style="padding:0 .4rem;color:#d1d5db;">|</span>' +
          '<a href="' + base + 'login.html" style="font-size:.83rem;color:#9ca3af;text-decoration:none;">전체 로그인 화면</a>' +
        '</div>' +
      '</div>';

    var w = document.createElement('div');
    w.innerHTML = html;
    document.body.appendChild(w);

    // Enter key support
    document.getElementById('auth-modal-pw').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') Auth._emailLogin();
    });
    document.getElementById('auth-modal-email').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('auth-modal-pw').focus();
    });
  }

  /* ── public API ────────────────────────────────────────── */
  return {
    isLoggedIn : isLoggedIn,
    getUser    : getUser,
    login      : login,
    logout     : logout,
    requireLogin : requireLogin,
    requirePage  : requirePage,
    syncHeader   : syncHeader,
    _doLogin : _doLogin,
    _social  : function (p) {
      var n = { kakao:'카카오유저', google:'구글유저' };
      _doLogin(p + '@demo.com', n[p] || p + '유저');
    },
    _emailLogin : function () {
      var email = (document.getElementById('auth-modal-email').value || '').trim();
      var pw    = document.getElementById('auth-modal-pw').value || '';
      var err   = document.getElementById('auth-modal-err');
      if (!email || !pw) {
        err.textContent = '이메일과 비밀번호를 입력해주세요.';
        err.style.display = 'block'; return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = '올바른 이메일 형식이 아닙니다.';
        err.style.display = 'block'; return;
      }
      err.style.display = 'none';
      _doLogin(email, email.split('@')[0]);
    }
  };
})();

/* ── Partial injector ────────────────────────────────────────
   Injects header/footer HTML directly (no AJAX) so the site
   works when opened via file:// without a local server.
   ─────────────────────────────────────────────────────────── */
function loadPartials() {
  var $hWrap = $('#header-placeholder');
  var $fWrap = $('#footer-placeholder');

  if ($hWrap.length) {
    $hWrap.html(HEADER_HTML);
    fixLinks($hWrap);
    initHeader();
  }

  if ($fWrap.length) {
    $fWrap.html(FOOTER_HTML);
    fixLinks($fWrap);
  }
}

/* ── Header init ─────────────────────────────────────────────*/
function initHeader() {
  // Render today's date
  var days = ['일', '월', '화', '수', '목', '금', '토'];
  var now  = new Date();
  var dateStr = now.getFullYear() + '년 '
    + String(now.getMonth() + 1).padStart(2, '0') + '월 '
    + String(now.getDate()).padStart(2, '0') + '일'
    + '(' + days[now.getDay()] + ')';
  $('#header-date').text(dateStr);

  // Highlight active nav link by matching href filename
  var current = window.location.pathname.split('/').pop() || 'index.html';
  $('#platform-header .nav-link, #platform-header .dropdown-item').each(function () {
    var href = $(this).attr('href') || '';
    var hrefFile = href.split('/').pop();
    if (hrefFile && hrefFile === current) {
      $(this).addClass('active');
      $(this).closest('.nav-item.dropdown').find('> .nav-link').addClass('active');
    }
  });

  // Search toggle
  $(document).on('click', '#header-search-btn', function () {
    $('#header-search-bar').toggleClass('d-none');
    if (!$('#header-search-bar').hasClass('d-none')) {
      $('#header-search-input').focus();
    }
  });

  $(document).on('click', '#header-search-close', function () {
    $('#header-search-bar').addClass('d-none');
    $('#header-search-input').val('');
  });

  $(document).on('submit', '#header-search-form', function (e) {
    e.preventDefault();
    var q = $.trim($('#header-search-input').val());
    if (q) alert('검색: ' + q);
  });

  // Profile button: my-make if logged in, else login modal
  $(document).on('click', '#header-user-btn', function () {
    if (Auth.isLoggedIn()) {
      window.location.href = getBaseUrl() + 'my-make.html';
    } else {
      Auth.requireLogin();
    }
  });

  // Reflect auth state in header
  Auth.syncHeader();
}

/* ── Global Lightbox ─────────────────────────────────────────
   이미지 클릭 시 전체화면 확대. 갤러리 그룹이면 ‹ › 네비게이션.
   모든 페이지 공통 적용. 헤더/푸터·아바타 등 제외.
   ─────────────────────────────────────────────────────────── */
var Lightbox = (function () {
  var _imgs   = [];   // 현재 그룹의 src 배열
  var _cur    = 0;    // 현재 인덱스
  var _ready  = false;

  /* CSS + DOM 1회 주입 */
  function _inject() {
    if (_ready) return;
    _ready = true;

    var s = document.createElement('style');
    s.textContent =
      /* 오버레이 */
      '#lb-ov{display:none;position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,.9);' +
        'align-items:center;justify-content:center;flex-direction:column;}' +
      '#lb-ov.lb-on{display:flex;}' +
      /* 이미지 */
      '#lb-img{max-width:90vw;max-height:82vh;object-fit:contain;' +
        'border-radius:.5rem;box-shadow:0 12px 48px rgba(0,0,0,.6);' +
        'user-select:none;pointer-events:none;}' +
      /* 캡션 */
      '#lb-cap{color:rgba(255,255,255,.6);font-size:.83rem;margin-top:.75rem;' +
        'min-height:1.2em;text-align:center;}' +
      /* 닫기 버튼 */
      '#lb-close{position:fixed;top:1rem;right:1.25rem;' +
        'background:rgba(255,255,255,.15);border:none;color:#fff;' +
        'width:44px;height:44px;border-radius:50%;font-size:1.4rem;' +
        'cursor:pointer;line-height:1;z-index:9991;' +
        'backdrop-filter:blur(6px);transition:background .15s;}' +
      '#lb-close:hover{background:rgba(255,255,255,.3);}' +
      /* 화살표 */
      '#lb-prev,#lb-next{position:fixed;top:50%;transform:translateY(-50%);' +
        'background:rgba(255,255,255,.15);border:none;color:#fff;' +
        'width:52px;height:52px;border-radius:50%;font-size:2rem;' +
        'cursor:pointer;line-height:1;z-index:9991;' +
        'backdrop-filter:blur(6px);transition:background .15s;' +
        'display:none;align-items:center;justify-content:center;}' +
      '#lb-prev{left:1rem;}#lb-next{right:1rem;}' +
      '#lb-prev:hover,#lb-next:hover{background:rgba(255,255,255,.3);}' +
      /* 카운터 */
      '#lb-count{position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);' +
        'color:rgba(255,255,255,.55);font-size:.82rem;display:none;}' +
      /* 줌 커서 */
      'img.lb-zoomable{cursor:zoom-in!important;}';
    document.head.appendChild(s);

    var el = document.createElement('div');
    el.innerHTML =
      '<div id="lb-ov">' +
        '<img id="lb-img" src="" alt="">' +
        '<div id="lb-cap"></div>' +
      '</div>' +
      '<button id="lb-close" onclick="Lightbox.close()">✕</button>' +
      '<button id="lb-prev"  onclick="Lightbox.prev()">‹</button>' +
      '<button id="lb-next"  onclick="Lightbox.next()">›</button>' +
      '<div    id="lb-count"></div>';
    document.body.appendChild(el);

    /* 오버레이 배경 클릭 → 닫기 */
    document.getElementById('lb-ov').addEventListener('click', function (e) {
      if (e.target === this) Lightbox.close();
    });

    /* 키보드: Esc·← · → */
    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('lb-ov').classList.contains('lb-on')) return;
      if (e.key === 'Escape')      Lightbox.close();
      if (e.key === 'ArrowLeft')   Lightbox.prev();
      if (e.key === 'ArrowRight')  Lightbox.next();
    });
  }

  /* 이미지 표시 */
  function _render() {
    var multi = _imgs.length > 1;
    document.getElementById('lb-img').src = _imgs[_cur];
    document.getElementById('lb-cap').textContent = multi ? (_cur + 1) + ' / ' + _imgs.length : '';
    document.getElementById('lb-prev').style.display  = multi ? 'flex' : 'none';
    document.getElementById('lb-next').style.display  = multi ? 'flex' : 'none';
    document.getElementById('lb-count').style.display = multi ? 'block' : 'none';
    if (multi) document.getElementById('lb-count').textContent = (_cur + 1) + ' / ' + _imgs.length;
  }

  /* 퍼블릭 */
  function open(srcs, idx) {
    _inject();
    _imgs = Array.isArray(srcs) ? srcs : [srcs];
    _cur  = idx || 0;
    _render();
    document.getElementById('lb-ov').classList.add('lb-on');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    var ov = document.getElementById('lb-ov');
    if (!ov) return;
    ov.classList.remove('lb-on');
    document.body.style.overflow = '';
    setTimeout(function () { document.getElementById('lb-img').src = ''; }, 80);
  }

  function prev() {
    _cur = (_cur - 1 + _imgs.length) % _imgs.length;
    _render();
  }

  function next() {
    _cur = (_cur + 1) % _imgs.length;
    _render();
  }

  return { open: open, close: close, prev: prev, next: next };
})();

/* 이미지 클릭 이벤트 (이벤트 위임 — 동적 콘텐츠 포함) */
$(document).on('click', 'img', function (e) {
  var el = this;

  /* 제외: 헤더·푸터·아바타(rounded-circle)·작은 이미지 */
  if ($(el).closest('#platform-header, #platform-footer').length) return;
  if ($(el).hasClass('rounded-circle') || $(el).closest('.rounded-circle').length) return;
  if (el.clientWidth < 80 || el.clientHeight < 60) return;

  var src = el.src;
  if (!src || src.length < 10) return;

  /* 같은 컨테이너의 이미지를 그룹으로 묶어 네비게이션 지원
     우선순위: .gallery-item 형제 → .tab-pane → .card-body → .row */
  var $group = $(el).closest('.gallery-item, .quest-card-completed .card-body, .tab-pane, .card-body, .row');
  if (!$group.length) $group = $(el).parent();

  var srcs = [];
  var idx  = 0;
  $group.find('img').each(function () {
    if ($(this).closest('#platform-header, #platform-footer').length) return;
    if ($(this).hasClass('rounded-circle') || $(this).closest('.rounded-circle').length) return;
    if (this.clientWidth < 80 || this.clientHeight < 60) return;
    var s = this.src;
    if (!s || s.length < 10) return;
    if (this === el) idx = srcs.length;
    srcs.push(s);
  });

  if (!srcs.length) srcs = [src];

  e.stopPropagation();
  Lightbox.open(srcs, idx);
});

/* lb-zoomable 커서 적용 (헤더·푸터·아바타 제외) */
$(document).on('mouseenter', 'img', function () {
  var el = this;
  if ($(el).closest('#platform-header, #platform-footer').length) return;
  if ($(el).hasClass('rounded-circle') || $(el).closest('.rounded-circle').length) return;
  if (el.clientWidth < 80 || el.clientHeight < 60) return;
  $(el).addClass('lb-zoomable');
});

/* ── DOM ready ───────────────────────────────────────────────*/
$(function () {
  loadPartials();
});
