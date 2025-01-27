

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".slider .item img");
  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const popupVideo = document.getElementById("popup-video");
  const closeBtn = document.querySelector(".popup .close");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.getAttribute("src");
      const videoId = imgSrc.match(/vi\/(.*?)\/mqdefault/)[1];
      const youtubeEmbedLink = `https://www.youtube.com/embed/${videoId}`;

      // 팝업 설정 및 애니메이션 시작
      popupVideo.src = youtubeEmbedLink;
      popup.classList.add("show");
      popupContent.classList.remove("closing"); // 닫힘 애니메이션 제거
    });
  });

  closeBtn.addEventListener("click", () => {
    popupContent.classList.add("closing"); // 닫힘 애니메이션 추가
    popupContent.addEventListener("animationend", function onAnimationEnd() {
      popup.classList.remove("show");
      popupVideo.src = ""; // 동영상 재생 중지
      popupContent.classList.remove("closing"); // 닫힘 애니메이션 초기화
      popupContent.removeEventListener("animationend", onAnimationEnd);
    });
  });

  // 팝업 외부 클릭 시 닫기
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closeBtn.click(); // 닫기 버튼 동작 실행
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".slider .item img");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // 젤리 효과 클래스 추가
      item.classList.add("jelly-effect");

      // 일정 시간이 지나면 젤리 효과 클래스 제거 (애니메이션 종료 후 초기화)
      item.addEventListener(
        "animationend",
        () => {
          item.classList.remove("jelly-effect");
        },
        { once: true } // 이벤트가 한 번만 실행되도록 설정
      );
    });
  });
});






function getMovies(element,page){
  fetch(`//https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=rating&page=${page}`)
      .then(data=>data.json())
      .then(data=>{
          const movies = data.data.movies;
          movies.forEach(movie=>{
              const div = document.createElement('div');
              div.className='item';
              div.innerHTML = `<img src="${movie.medium_cover_image}" alt="">`;
              element.appendChild(div);
          })
      })
}







document.addEventListener('DOMContentLoaded', function () {
  const next = document.querySelectorAll('.next');
  const prev = document.querySelectorAll('.prev');
  const slider = document.querySelectorAll('.slider');

  for (let i = 0; i < slider.length; i++) {
      getMovies(slider[i], i + 1);
      makeSlider(slider[i], prev[i], next[i]);
  }

  function makeSlider(element, prev, next) {
      next.addEventListener('click', () => {
          const offsetX = element.offsetWidth;
          element.scrollBy(offsetX, 0);
      });
      prev.addEventListener('click', () => {
          const offsetX = element.offsetWidth;
          element.scrollBy(-offsetX, 0);
      });
  }
});









document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll('.slider');
  const prevButtons = document.querySelectorAll('.prev');
  const nextButtons = document.querySelectorAll('.next');

  sliders.forEach((slider, index) => {
    let currentPosition = 0; // 슬라이더의 현재 위치
    const sliderWidth = slider.offsetWidth; // 슬라이더의 너비
    const totalWidth = slider.scrollWidth; // 전체 아이템의 너비

    const prev = prevButtons[index];
    const next = nextButtons[index];

    // 오른쪽 이동
    next.addEventListener('click', () => {
      const maxPosition = -(totalWidth - sliderWidth);
      currentPosition = Math.max(currentPosition - sliderWidth, maxPosition);
      slider.style.transform = `translateX(${currentPosition}px)`;
    });

    // 왼쪽 이동
    prev.addEventListener('click', () => {
      currentPosition = Math.min(currentPosition + sliderWidth, 0);
      slider.style.transform = `translateX(${currentPosition}px)`;
    });
  });
});
