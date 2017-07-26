$(function(){

    var model = {
        init: function(){

            const cats = [
                {name:'cat1', clickCount:0},
                {name:'cat2', clickCount:0},
                {name:'cat3', clickCount:0},
                {name:'cat4', clickCount:0},
            ]
            if(!localStorage.cats){
                localStorage.cats = JSON.stringify(cats);
            }
            else{
                localStorage.clear();
                localStorage.cats = JSON.stringify(cats);
            }

        },
        getCats: function(){
            return JSON.parse(localStorage.cats);
        }
    };

    var octopus = {
        init: function(){
            model.init();
            view.init();
        },
        getCats: function(){
            return model.getCats()
        }
    };

    var view = {
        init: function(){
            this.catList = document.getElementById('catList');
            this.catView = document.getElementById('catView');
            view.render();
        },
        render: function(){
            var htmlStr = '';

            octopus.getCats().forEach(function(cat){

                var li = document.createElement('li');
                li.innerHTML = cat.name;
                li.addEventListener('click', function(){
                    catView.render(cat);
                })
                this.catList.appendChild(li);
            });

        }
    };

    var catView = {
        render: function(cat){
            var catImage = document.getElementById('catImage');
            var clickCount = document.getElementById('clickCount');
            var catName = document.getElementById('catName');

            catName.innerText = cat.name;
            catImage.setAttribute('src', './images/'+cat.name+'.jpg');
            clickCount.innerText = cat.clickCount;

            catImage.addEventListener('click', function() {
                var cats = octopus.getCats();
                console.log(cats)
                for(let i=0; i<cats.length; i++){
                    if(cat.name === cats[i].name){
                        let count =  cats[i].clickCount;
                        clickCount.innerHTML = count++;
                        cats[i].clickCount = count++;
                    }
                }
                localStorage.setItem('cats', JSON.stringify(cats));

            });
        }
    }
    octopus.init();
});