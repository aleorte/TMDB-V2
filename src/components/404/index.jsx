import "./index.css"
export function NotFound(){
  return (
    <>
  {/* <!--dust particel--> */}
  <div >
    <div className="starsec"></div>
    <div className="starthird"></div>
    <div className="starfourth"></div>
    <div className="starfifth"></div>
  </div>
  {/* <!--Dust particle end---> */}
  <div className="lamp__wrap">
    <div className="lamp">
      <div className="cable"></div>
      <div className="cover"></div>
      <div className="in-cover">
        <div className="bulb"></div>
      </div>
      <div className="light"></div>
    </div>
  </div>
  {/* <!-- END Lamp --> */}
  <section className="error">
    {/* <!-- Content --> */}
    <div className="error__content">
      <div className="error__message message">
      <h1 className="message__title">404</h1>
        <h1 className="message__title">Page Not Found</h1>
      </div>
      <div className="error__nav e-nav">
        {/* <a href=""  className="e-nav link"></a> */}
      </div>
    </div>
    {/* <!-- END Content --> */}
  
  </section>
    </>
  )
}

