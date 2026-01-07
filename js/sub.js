$(function(){
    /* 스크롤 시 부드럽게 */
    const lenis = new Lenis({
        duration: 1.2,   // 스크롤 속도
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    /* aos */
    AOS.init();

    /* fancybox */
	Fancybox.bind("[data-fancybox]", {
	});
    
});