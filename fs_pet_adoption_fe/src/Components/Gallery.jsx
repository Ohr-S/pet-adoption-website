import { CCarousel, CCarouselItem, CImage } from '@coreui/react'


function Gallery() {

    return (
       <div>
            <div>
                <h1>Here are some of the dogs we helped find a forever home!</h1>
            </div>
            <CCarousel controls indicators dark>
                <CCarouselItem>
                    <CImage style={{"height" : "100%", "width" : "100%", "maxHeight" : "500px", "maxWidth" : "800px"}} src="https://images1.calcalist.co.il/PicServer3/2018/09/22/848026/11BL.jpg" alt="slide 1" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage style={{"height" : "100%", "width" : "100%", "maxHeight" : "500px", "maxWidth" : "800px"}} src="https://www.israelhayom.co.il/sites/default/files/u249/haim%20tll.jpg" alt="slide 2" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage style={{"height" : "100%", "width" : "100%", "maxHeight" : "500px", "maxWidth" : "800px"}} src="https://www.thesprucepets.com/thmb/juVfOyd7RGfXMyRTC_vTFr0eqVU=/1579x1184/smart/filters:no_upscale()/his-toy-dont-touch_t20_EPeWOJ-5ad0cb6f43a1030037f6ae6d.jpg" alt="slide 3" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage style={{"height" : "100%", "width" : "100%", "maxHeight" : "500px", "maxWidth" : "800px"}} src="https://img.mako.co.il/2018/06/26/shutterstock_1038910090_i.jpg" alt="slide 4" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage style={{"height" : "100%", "width" : "100%", "maxHeight" : "500px", "maxWidth" : "800px"}} src="https://img.mako.co.il/2018/06/26/shutterstock_499979749_c.jpg" alt="slide 5" />
                </CCarouselItem>
            </CCarousel>
       </div>
    );
}

export default Gallery;
