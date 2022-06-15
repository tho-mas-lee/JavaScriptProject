let url;
let data;
let news;
let page = 1;
let total_page = 0;
// 상단 Input 버튼 클릭시 보이게
const openSearchGroup = () => {
	let searchGroup = document.getElementById("search_group");
	if (searchGroup.style.display == "none") {
		searchGroup.style.display = "inline";
	} else {
		searchGroup.style.display = "none";
	}
};

// 모바일 side topic menu 열기
const openSideMenu = () => {
	document.getElementById("side_nav").style.width = "250px";
};
const closeSideMenu = () => {
	document.getElementById("side_nav").style.width = "0";
};
// topic 버튼 활성화
let menuButton = document.querySelectorAll("#topic_list button");
menuButton.forEach((menu) => {
	menu.addEventListener("click", (e) => printByTopic(e));
});

// 뉴스 부르기
const getLatestNews = () => {
	//첫 시작 화면
	url = new URL(
		`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&page_size=10`
	);
	getNews();
};
const printByTopic = (event) => {
	//버튼눌러서 찾기
	let topic_pushed = event.target.textContent.toLowerCase();
	url = new URL(
		`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic_pushed}&page_size=10`
	);
	event.target.classList.add("active_button");
	document.querySelectorAll("#topic_list button").forEach((item) => {
		if (item != event.target) {
			item.classList.remove("active_button");
		}
	});
	page = 1;
	closeSideMenu();
	getNews();
};
const printBySearch = () => {
	//검색해서 찾기
	let keyword = document.getElementById("search_input").value;
	url = new URL(
		`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=kr&page_size=10`
	);
	page = 1;
	getNews();
};
const getNews = async () => {
	let header = new Headers({
		"x-api-key": "xaGE4sUGBPPYlkcZtHgEhu3f1extBAmnCEeP-b95ub4",
	});
	url.searchParams.set("page", page);
	let response = await fetch(url, { headers: header });
	data = await response.json();
	news = data.articles;
	console.log("리스폰스는:", response);
	console.log("데이터는", data);
	console.log("뉴스", news);
	try {
		if (response.status == 200) {
			if (data.total_hits == 0) {
				throw new Error("데이터가 없습니다");
			}
			render();
		} else {
			throw new Error(data.message);
		}
	} catch (error) {
		errorRender(error.message);
	}
};

const render = () => {
	let newsHTML = news
		.map((item) => {
			return `<div class=" row news">
        <div class="col-lg-4">
            <img class='news_img' src="${
							item.media == null
								? "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?b=1&k=20&m=1357365823&s=170667a&w=0&h=y6ufWZhEt3vYWetga7F33Unbfta2oQXCZLUsEa67ydM="
								: item.media
						}" />
        </div>
        <div class="col-lg-8">
            <h2><a href='${item.link}' target='_blank' class='news_title'>${
				item.title
			}</a></h2>
            <p>${
							item.summary == "" || item.summary == null
								? "내용 없음"
								: item.summary.length > 200
								? item.summary.substr(0, 200) + "..."
								: item.summary
						}</p>
            <div>${moment(item.published_date).fromNow()}</div>
        </div>
    </div>`;
		})
		.join("\n");

	document.getElementById("news_board").innerHTML = newsHTML;
	pageNate();
};

const errorRender = (error) => {
	document.getElementById(
		"news_board"
	).innerHTML = `<div class="alert alert-danger" role="alert">
    ${error}
  </div>
  `;
	pageNate();
};

// 페이지네이션
const pageNate = () => {
	let page_group = Math.ceil(page / 5);
	total_page = data.total_pages;
	let last = page_group * 5 > total_page ? total_page : page_group * 5;
	let first = page_group * 5 - 4;
	let pageNationHTML =
		page_group == 1
			? ""
			: `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${1})">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
  <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${
				(page_group - 1) * 5
			})">
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>`;

	for (let i = first; i <= last; i++) {
		pageNationHTML += `<li class="page-item ${
			page == i ? "active" : ""
		}"><a class="page-link" href="#" onclick = "moveToPage(${i})">${i}</a></li>`;
	}
	if (last < total_page) {
		pageNationHTML += `<li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${
					(page_group + 1) * 5 - 4
				})">
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
      <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${total_page})">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>`;
	}
	document.querySelector(".pagination").innerHTML = pageNationHTML;
};
const moveToPage = (pageNum) => {
	page = pageNum;
	getNews();
};
getLatestNews();
