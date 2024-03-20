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
        <button class="btn btn-outline-success">Thử đồ</button>
        </div>
        `
    })
    domID("tab-content").innerHTML = content;
}

