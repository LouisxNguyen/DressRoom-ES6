import { ApiTab, ApiItems } from '../services/api.js';
// import pareNavPill from '../models/tab.js'


const domID = (id) => document.getElementById(id);
//CALL API
const apiTab = new ApiTab();
const apiItems = new ApiItems();
const getTabList = () => {
    const promise = apiTab.getApi();
    promise
        .then((tabList) => {
            const tab = tabList.data;
            renderUI(tab);
            const checkType = (type) => {
                console.log(type)
                getItemList(type)
            }
            window.checkType = checkType;
        })
}
getTabList();

const renderUI = (data) => {
    let contentHTML = data.reduce((content, item) => {
        return (
            content += `
            <button class="btn btn-outline-secondary" onclick="checkType('${item.type}')">${item.showName}</button>
            `
        )
    }, "");
    domID("tabItems").innerHTML = contentHTML;
};


// GET API ITEMS
const getItemList = (type) => {
    const promise = apiItems.getApi();
    let arrItems = [];
    promise
        .then((itemList) => {
            const items = itemList.data;
            items.forEach((item) => {
                if(item.type == type){
                    arrItems.push(item);
                }
            })   
            renderUIItem(arrItems, type);
        })
}

const renderUIItem = (data, type) => {
    let content = '';
    data.forEach((item) => {
        content += `
        <div class="col-3">
        <img class="w-50" src="../../assets/images/${type}/${item.imgSrc_jpg}" />
        <h4>${item.name}</h4>
        <p>${item.type}</p>
        <button class="btn btn-outline-success" onclick="changeClo('${item.type}','${item.imgSrc_png}')">Thử đồ</button>
        </div>
        `
    })
    domID("tab-content").innerHTML = content;
}

const changeStyle = (type, width, height, img, bottom, right, scale, zindex) => {
    domID(`${type}`).style = `width: ${width}px; height: ${height}px; background: url(../../assets/images/${type}/${img}); position: absolute; bottom: ${bottom}%; right: ${right}%; transform: scale(${scale}); z-index: ${zindex};`
}
const changeClo = (type, img) => {
    if(type == 'necklaces'){
        changeStyle(type, 500, 1000, img, -40, -3.5, 0.5, 4);
    }
    else if(type == 'hairstyle'){
        changeStyle(type, 1000, 1000, img, -75, -57, 0.15, 4);
    }
    else if(type == 'topclothes'){
        changeStyle(type, 500, 500, img, -9, -5, 0.5, 3);
    }
    else if(type == 'botclothes'){
        changeStyle(type, 500, 1000, img, -30, -5, 0.5, 2);
    }
    else if(type == 'shoes'){
        changeStyle(type, 500, 1000, img, -40, -3.5, 0.5, 1);
    }
    else if(type == 'handbags'){
        changeStyle(type, 500, 1000, img, -37, -3.5, 0.5, 4);
    }
    else if(type == 'background'){
        domID(`${type}`).style = `background-image: url(../../assets/images/${type}/${img})`
    }
}
window.changeClo = changeClo;