const container = document.querySelector(".data-container");
let allBlock = []; 
function generateBlocks(item, index) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.height = `${item * 3}px`;
    block.style.transform = `translateX(${index * 12}px)`;

    const blockLabel = document.createElement('label');
    blockLabel.classList.add('block__id');
    blockLabel.innerHTML = item;

    block.appendChild(blockLabel);
    container.appendChild(block);
}


function swap(e1, e2) {
    return new Promise(function(resolve, reject) {
        const style1 = window.getComputedStyle(e1);
        const style2 = window.getComputedStyle(e2);

        const transform1 = style1.getPropertyValue('transform');
        const transform2 = style2.getPropertyValue('transform');

        e1.style.transform = transform2;
        e2.style.transform = transform1;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(e2, e1);
                resolve();
            }, 150);
        });
    });
}


async function bubbleSort(allBlock) {
    let sorted;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < allBlock.length - 1; i++) {
            const value1 = Number(allBlock[i].childNodes[0].innerHTML);
            const value2 = Number(allBlock[i + 1].childNodes[0].innerHTML);
            if (value1 > value2) {
                await swap(allBlock[i], allBlock[i + 1]);
                allBlock = document.querySelectorAll('.block');
                sorted = false;
            }
        }
    }
}

async function generateArray(value) {
    const arr = [];
    container.innerHTML = '';
    for (let i = 0; i < value; i++) {
        arr[i] = Math.floor(Math.random() * 100);
    }
    arr.forEach(generateBlocks);
    allBlock = await document.querySelectorAll('.block');
}


    function myFunc() {
        bubbleSort(allBlock);
    }
    document.getElementById("button1").addEventListener("click", myFunc);