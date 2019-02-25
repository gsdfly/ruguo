<script>
export default {
  created () {
  }
}
</script>

<style>
/*.container {*/
  /*height: 100%;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*padding: 200rpx 0;*/
  /*box-sizing: border-box;*/
/*}*/
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div,h1,h2,h3,h4,h5,h6,input,button,span,i,b,ul,li,ol{
  box-sizing: border-box;
}
button {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  background: transparent;
}
button:after {
  border: none;
}
button:active {
  background: transparent;
}
button::after{
  border: none;
}
  img{
    display: block;
  }
</style>
