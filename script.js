// Functions
function num(i,j){
    return i*n+j+1
}
function coordx(num){
    num--
    y=num%n;
    x=(num-y)/n
    return x
}
function coordy(num){
    num--
    y=num%n;
    x=(num-y)/n
    return y
}

function randomInt(x,y){
    return Math.floor(Math.random() * (y - x)) + x;
}

function m2048(mas){
    mas=insert(mas)
    // mas=[[2,4,8,16],[32,64,128,256],[512,1024,2048,0],[0,0,0,0]]
    $('#ts').text(score)
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if(mas[i][j]!=0){
                $('#bl'+ String(num(i,j))).html(`<div class='bl${n}x${n}' style='background-color:${blbgcolors[mas[i][j]]}; color:${blcolors[mas[i][j]]}; font-size:${String((blfs[mas[i][j]]-10*(n-4))/10.8)}vh'>${blocks[mas[i][j]]}</div>`)
            }
            else{
                $('#bl'+ String(num(i,j))).empty()
            }
            if(mas[i][j]==2048){
                gameOver(n, 2)
                mas=0
                localStorage.setItem('best4', String(score))
            }
        }
    }
    if(n==4){
        $('.bl5x5').attr('class','bl4x4')

        if(score>localStorage.getItem('best4')){
            localStorage.setItem('best4', String(score))
            $('#tb').text(localStorage.getItem('best4'))
        }    
    }
    else{
        $('.bl4x4').attr('class','bl5x5')

        if(score>localStorage.getItem('best5')){
            localStorage.setItem('best5', String(score))
            $('#tb').text(localStorage.getItem('best5'))
        }    
    }
    
    
}

function emptyNums(mas){
    sp=[]
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if(mas[i][j]==0){
                sp.push(num(i,j))
            }
        }
    }
    if(sp.length==0){
        return false
    }
    return sp
}

function insert24(mas, x, y){
    if(randomInt(0,10)==0){
        mas[x][y]=4
    }
    else{
        mas[x][y]=2
    }
    
}
function insert(mas){
    let i=emptyNums(mas)[randomInt(0, emptyNums(mas).length)]
    insert24(mas,coordx(i),coordy(i))
    return mas
}
function moveLeft(mas){
    dscore=0
    
    for(i=0;i<n;i++){   
        
        while(mas[i].indexOf(0)!=-1){
            mas[i].splice(mas[i].indexOf(0),1)
        }        
        while(mas[i].length!=n){
            mas[i].push(0)
        }
        for(j=0;j<(n-1);j++){
            if(mas[i][j]==mas[i][j+1] && mas[i][j]!=0){
                mas[i][j]*=2
                dscore+=mas[i][j]
                mas[i].splice(j+1,1)
                mas[i].push(0)
            }
        }
        
        
    }    
    
    return dscore
}
function moveRight(mas){
    dscore=0
    for(i=0;i<n;i++){
        while(mas[i].indexOf(0)!=-1){
            mas[i].splice(mas[i].indexOf(0),1)
        }       
        while(mas[i].length!=n){
            mas[i].unshift(0)
        }
        for(j=(n-1);j>0;j--){
            if(mas[i][j]==mas[i][j-1] && mas[i][j]!=0){
                mas[i][j]*=2
                dscore+=mas[i][j]
                mas[i].splice(j-1,1)
                mas[i].unshift(0)
            }
        }
    }    
   
    return dscore
}
function moveUp(mas){
    dscore=0
    for(j=0;j<n;j++){
        column=[]
        

        for(i=0;i<n;i++){
            if(mas[i][j]!=0){
                column.push(mas[i][j])
            }
        }
        while(column.length!=n){
            column.push(0)
        }
        for(i=0;i<(n-1);i++){
            if(column[i] == column[i + 1] && column[i] != 0){
                column[i] *= 2
                dscore += column[i]
                column.splice(i+1,1)
                column.push(0)
            }
        }
        columnbf=[]
        
        for(i=0;i<n;i++){
            mas[i][j]=column[i]
        }
    }
    return dscore
}
function moveDown(mas){
    dscore=0
    for(j=0;j<n;j++){
        column=[]
        for(i=0;i<n;i++){
            if(mas[i][j]!=0){
                column.push(mas[i][j])
            }
        }
        while(column.length!=n){
            column.unshift(0)
        }
        for(i=(n-1);i>0;i--){
            if(column[i] == column[i - 1] && column[i] != 0){
                column[i] *= 2
                dscore += column[i]
                column.splice(i-1,1)
                column.unshift(0)
            }
        }
        for(i=0;i<n;i++){
            mas[i][j]=column[i]
        }
    }
    return dscore
}
function gameOver(n, mode){
    $('#gameover').fadeIn()
    if(mode==1){
        $('#gameover').html('<span id="go">Game over</span><div id="tryagain"><span id="textta">Try again</span></div>')
    }           
    else{
        $('#gameover').html('<span id="go">You win!</span><div id="tryagain"><span id="textta">Play again</span></div>')
    }
    $('#tryagain').on('click', function(){
    if(n==4){
        mas=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    }
    else{
        mas=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    }
    score=0
    insert(mas)
    m2048(mas)
                    
    $('#gameover').fadeOut()
    })
}
function viewDelta(){
    $('#delta').finish()
    $('#delta').text('+'+String(delta))
    $('#delta').fadeTo(300, 1)
    $('#delta').fadeTo(300,0)
}
function draw(){
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            if(mas[i][j]!=0){
                $('#bl'+ String(num(i,j))).html(`<div class='bl${n}x${n}' style='background-color:${blbgcolors[mas[i][j]]}; color:${blcolors[mas[i][j]]}; font-size:${String((blfs[mas[i][j]]-10*(n-4))/10.8)}vh'>${blocks[mas[i][j]]}</div>`)
            }
            else{
                $('#bl'+ String(num(i,j))).empty()
            }
        }
    }
}
// Variables
let mas=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let n = 4
let score=0
let blbgcolors={
    2: '#eee6db',
    4: '#ece0c8',
    8:'#efb27c',
    16:'#f39768',
    32:'#f17d62',
    64:'#f46042',
    128:'#eacf76',
    256:'#edcb67',
    512:'#ecc85a',
    1024:'#e7c257',
    2048:'#e8be4e'
}
let blcolors={
    2: '#767064',
    4: '#767064',
    8: '#ffffff',
    16:'#ffffff',
    32:'#ffffff',
    64:'#ffffff',
    128:'#ffffff',
    256:'#ffffff',
    512:'#ffffff',
    1024:'#ffffff',
    2048:'#ffffff'
}
let blfs={
    2: 100,
    4: 100,
    8: 100,
    16:100,
    32:100,
    64:100,
    128:90,
    256:90,
    512:90,
    1024:80,
    2048:80
}
// let ={
//     2: '',
//     4: '',
//     8: '',
//     16:'',
//     32:'',
//     64:'',
//     128:'',
//     256:'',
//     512:'',
//     1024:'',
//     2048:''
// }
let blocks={
    2: '2',
    4: '4',
    8: '8',
    16:'16',
    32:'32',
    64:'64',
    128:'128',
    256:'256',
    512:'512',
    1024:'1024',
    2048:'2048'
}

// Event handlers
$('body').on('keydown', function(event){
        if(event.keyCode===37 || event.keyCode===65){
            delta=moveLeft(mas)
            
            score+=delta
            if(delta!=0){
                viewDelta()
                
            }
            
            
            if(emptyNums(mas)){
                m2048(mas)
            }
            else{
                gameOver(n,1)
                mas=0 
            }
            
        }
        if(event.keyCode===38 || event.keyCode===87){
            delta=moveUp(mas)
            
            score+=delta
            if(delta!=0){
                viewDelta()
            }
            if((emptyNums(mas))){
                m2048(mas)
            }
            else{
                gameOver(n,1)
                mas=0
            }
        }
        if(event.keyCode===39 || event.keyCode===68){
            delta=moveRight(mas)
            
            score+=delta
            if(delta!=0){
                viewDelta()
            }
            if(emptyNums(mas)){
                m2048(mas)
            }
            else{
                gameOver(n,1)
                mas=0
            }
        }
        if(event.keyCode===40 || event.keyCode===83){
            delta=moveDown(mas)
            
            score+=delta
            if(delta!=0){
                viewDelta()
            }
            if(emptyNums(mas)){
                m2048(mas)
            }
            else{
                gameOver(n,1)
                mas=0
            }
        }})
$('#r116').on('click', function(){
    mas=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    n = 5
    score=0
    
    $('#main').empty()
    for(i=1;i<=n**2;i++){
        $('#main').append(`<div class="bl" id="bl${i}"></div>`)
    }
    $('#main').css({
        'width': '84.72vh',
        'height': '84.72vh',
        
    })
    $('.bl').css({
        'width': '15.278vh',
        'height': '15.278vh'
    })
    
    $('#r116').css('border','0.648vh solid #FF0000')
    $('#r115').css('border','0.185vh solid #000000')

    if(localStorage.getItem('best5')>0){
        $('#tb').text(localStorage.getItem('best5'))
    }
    else{
        localStorage.setItem('best5', 0)
        $('#tb').text(localStorage.getItem('best5'))
    }
    


    
    insert(mas)
    m2048(mas)
    
})
$('#r115').on('click', function(){
    $('#main').empty()
    mas=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    n = 4
    score=0
    
    for(i=1;i<=n**2;i++){
        $('#main').append(`<div class="bl" id="bl${i}"></div>`)
    }
    $('#main').css({
        'width': '81vh',
        'height': '81vh',
    })
    $('.bl').css({
        'width': '18.5vh',
        'height': '18.5vh'
    })
    
    $('#r115').css('border','0.648vh solid #FF0000')
    $('#r116').css('border','0.185vh solid #000000')

    if(localStorage.getItem('best4')>0){
        $('#tb').text(localStorage.getItem('best4'))
    }
    else{
        localStorage.setItem('best4', 0)
        $('#tb').text(localStorage.getItem('best4'))
    }
    
    insert(mas)
    m2048(mas)
    
})
$('#doge').on('click', function(){
    blocks={
        2: `<img src="https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png" alt="" class='bl${n}x${n}'>`,
        4: `<img src="https://media.giphy.com/media/qrwthQPPQrtEk/giphy.gif" alt="" class='bl${n}x${n}'>`,
        8: `<img src="https://media.giphy.com/media/oBQZIgNobc7ewVWvCd/giphy.gif" alt="" class='bl${n}x${n}'>`,
        16:`<img src="https://media.giphy.com/media/8FUmlOoL72HB3rR7wm/giphy.gif" alt="" class='bl${n}x${n}'>`,
        32:`<img src="https://media.giphy.com/media/VRKheDy4DkBMrQm66p/giphy.gif" alt="" class='bl${n}x${n}'>`,
        64:`<img src="https://media.giphy.com/media/lMyEespPQdFoWuK4oP/giphy.gif" alt="" class='bl${n}x${n}'>`,
        128:`<img src="https://media.giphy.com/media/10ECejNtM1GyRy/giphy.gif" alt="" class='bl${n}x${n}'>`,
        256:`<img src="https://media.giphy.com/media/jUSrFvui8Pfpe/giphy.gif" alt="" class='bl${n}x${n}'>`,
        512:`<img src="https://media.giphy.com/media/YBt4HbXaLt8GpN5xZ7/giphy.gif" alt="" class='bl${n}x${n}'>`,
        1024:`<img src="https://media.giphy.com/media/9C1nyePnovqlpEYFMD/giphy.gif" alt="" class='bl${n}x${n}'>`,
        2048:`<img src="https://media.giphy.com/media/2YIB4zBoMFI1XDbhXU/giphy.gif" alt="" class='bl${n}x${n}'>`
    }
    $('#doge').css('border','0.648vh solid #FF0000')
    $('#classic, #memes').css('border','0.185vh solid #000000')
    
    draw()
})
$('#classic').on('click', function(){
    blocks={
        2: '2',
        4: '4',
        8: '8',
        16:'16',
        32:'32',
        64:'64',
        128:'128',
        256:'256',
        512:'512',
        1024:'1024',
        2048:'2048'
    }
    $('#classic').css('border','0.648vh solid #FF0000')
    $('#doge, #memes').css('border','0.185vh solid #000000')
    
    draw()
})
$('#memes').on('click', function(){
    blocks={
        2: `<img src="https://ru.meming.world/images/ru/thumb/7/7e/%D0%9C%D0%B0%D0%B9%D0%BA_%D0%92%D0%B0%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8_%D1%81_%D0%BB%D0%B8%D1%86%D0%BE%D0%BC_%D0%A1%D0%B0%D0%BB%D0%BB%D0%B8_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD.jpg/300px-%D0%9C%D0%B0%D0%B9%D0%BA_%D0%92%D0%B0%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8_%D1%81_%D0%BB%D0%B8%D1%86%D0%BE%D0%BC_%D0%A1%D0%B0%D0%BB%D0%BB%D0%B8_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD.jpg" alt="" class='bl${n}x${n}'>`,
        4: `<img src="https://sun9-23.userapi.com/impg/bhQb8vfOsc1D1DlUJ4cRx6HFz2tBwj6QaLb7KA/cjeBfJM6pvI.jpg?size=1080x996&quality=96&sign=85812e9e83d598dc9601a675ad3f72de&type=album" alt="" class='bl${n}x${n}'>`,
        8: `<img src="https://360tv.ru/media/uploads/article_images/2019/06/37866_%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B0.jpg" alt="" class='bl${n}x${n}'>`,
        16:`<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7delKThgrQ_mDUj515URunpXoj_ToUCeLXhI-i_5nIuZKhfPxJfPqze9K9psg0SHbS8c&usqp=CAU" alt="" class='bl${n}x${n}'>`,
        32:`<img src="https://sun9-18.userapi.com/impg/WimRsRiLytWt91rF46sUqju2N7ImiHBvydk9_w/vkBgHBNFRpo.jpg?size=1063x1080&quality=96&sign=d375b790ee321c8b2c202dd20d6b61ab&type=album" alt="" class='bl${n}x${n}'>`,
        64:`<img src="https://sun9-31.userapi.com/impg/dvpNAhaPThfzXII7fXb_igwB-BooKr1f6Hzdgw/XtEINIxClkM.jpg?size=680x810&quality=96&sign=446940db7a8592e247ee246b1f5ec8f6&type=album" alt="" class='bl${n}x${n}'>`,
        128:`<img src="https://sun9-24.userapi.com/impg/oqwMB5SYV1c9ViDIEYLPUKL34uC48JsgeZLgjA/KWfyi8tNU54.jpg?size=487x530&quality=96&sign=97d9f59835271cc54d8e377edf59cf7a&type=album" alt="" class='bl${n}x${n}'>`,
        256:`<img src="https://sun9-5.userapi.com/impg/DMYsT2308zNhXgPZ5lexWfpNOzOFKrYdMfYNlQ/ii9GBC5WUzw.jpg?size=568x564&quality=96&sign=7b479f3375c2c25e7de63f90a1d59fd6&type=album" alt="" class='bl${n}x${n}'>`,
        512:`<img src="https://sun9-56.userapi.com/impg/zZ4S0kY1RbROXQgKbBMU2cavXgHAlhJaSf_JiQ/XewrP6dhGSQ.jpg?size=633x637&quality=96&sign=8e88f8fa43c28b0a2b433144f96006fa&type=album" alt="" class='bl${n}x${n}'>`,
        1024:`<img src="https://sun9-60.userapi.com/impg/wn0xooBW7bby555JYjGCw27f_NjfqfXVrq_5Pw/c-y5Y8r054Y.jpg?size=1080x1008&quality=96&sign=c3c9ce4c0997e3f7242f5f96affa90b5&type=album" alt="" class='bl${n}x${n}'>`,
        2048:`<img src="https://sun9-39.userapi.com/impg/dkCN6-uZJdAlYPfU37ZDPA_F1s0zCJrf-o3yTw/ZmYHSVmh-Lk.jpg?size=720x707&quality=96&sign=223d917c868a2150be43fee2360aff9f&type=album" alt="" class='bl${n}x${n}'>`
    }
    $('#memes').css('border','0.648vh solid #FF0000')
    $('#classic, #doge').css('border','0.185vh solid #000000')
    
    draw()
})
$('#tryagain').on('click', function(){
    if(n==4){
        mas=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    }
    else{
        mas=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    }
    insert(mas)
    m2048(mas)
})

// Code 
$('#gameover').hide()
insert(mas)
m2048(mas)
if(localStorage.getItem('best4')>0){
    $('#tb').text(localStorage.getItem('best4'))
}
else{
    localStorage.setItem('best4', 0)
    
}
