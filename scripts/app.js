// fetch all lessons
const fetchAllLessons = async () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  const res = await fetch(url);
  const data = await res.json();

  showAllLessons(data);
}

// fetch lesson by level
const fetchLessonByLevel = async (level) => {
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  const res = await fetch(url);
  const data = await res.json();

  showLessonBylevel(data);
}

// show lesson by level
const showLessonBylevel = (lessonByLevelObj) => {
  const singleLessonContainer = document.getElementById('single-lesson-container');
  singleLessonContainer.innerHTML = '';
  const lessonByLevelArr = lessonByLevelObj.data;

  for(const SinglelessonByLevelObj of lessonByLevelArr) {
    console.log(SinglelessonByLevelObj.word, SinglelessonByLevelObj.meaning, SinglelessonByLevelObj.pronunciation);

    const singleLessonCard = document.createElement('div');
    singleLessonCard.style.backgroundColor = 'white';
    singleLessonCard.innerHTML = `
      <div class="p-5 rounded text-center">
        <h5 class="text-center text-2xl font-bold">
          ${SinglelessonByLevelObj.word} 
          <span class="text-gray-500 text-base font-normal">(${SinglelessonByLevelObj.pronunciation})</span>
        </h5>
        <p class="text-[#422AD5]">Meaning: ${SinglelessonByLevelObj.meaning}</p>
        <div class="flex justify-between mt-5">
          <i class="fa-solid fa-circle-info text-gray-500 bg-[#1A91FF10] p-3 rounded-sm"></i>
          <i class="fa-solid fa-volume-high text-gray-500 bg-[#1A91FF10] p-3 rounded-sm"></i>
        </div>
      </div>
    `;

    singleLessonContainer.append(singleLessonCard);
  }
}

// show all lessons
const showAllLessons = (lessonsObj) => {
  const lessonButtonsContainer = document.getElementById('lesson-button-container');
  const lessonsArr = lessonsObj.data;

  for(const lesson of lessonsArr) {
    const lessonBtnDiv = document.createElement('div');

    lessonBtnDiv.innerHTML = `
      <button onclick="fetchLessonByLevel('${lesson.level_no}')" class="btn btn-sm text-[#422AD5] bg-[#ffffff00] border border-[#422AD5] hover:bg-[#422AD5] hover:text-white">
          <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;

    lessonButtonsContainer.append(lessonBtnDiv);
  }
}

fetchAllLessons();