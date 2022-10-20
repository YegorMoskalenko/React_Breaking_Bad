export const animateItems = () => {
    let startMount = true
    const animItems = document.querySelectorAll('.anim-items');
    if(animItems.length > 0){
        window.addEventListener('scroll', animOnScroll)
        function animOnScroll(){
            for(let i = 0; i < animItems.length; i++){
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if(animItemHeight > window.innerHeight){
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if(window.pageYOffset > (animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)){
                    animItem.classList.add('anim-active')
                }
                if(startMount === true){
                    animItem.classList.remove('anim-active')
                }
            }
        }
        const offset = el => {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }
        setTimeout(() => {
            animOnScroll()
        }, 300)
    }
    startMount = false
}