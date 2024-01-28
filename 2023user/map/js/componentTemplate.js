// nav 클릭하면 이동
document.querySelectorAll('.nav .nav-link').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(el.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

function scrollProgress() {
  const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

  document.querySelectorAll('.guide-inner-wrap').forEach((el, index) => {
    if (scrollTop >= el.offsetTop - 100) {
      document.querySelectorAll('.nav .nav-link').forEach((el) => {
        el.classList.remove('active');
      });
      document.querySelector('.nav .nav-link:nth-child(' + (index + 1) + ')').classList.add('active');
    }
  });
}
window.addEventListener('scroll', scrollProgress);