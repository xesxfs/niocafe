         w�E        stem.C     LP���        sing System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text.RegularExpressions;
using System.Web.Security;
using System.Configuration;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Security.Cryptography;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Runtime.Serialization.Json;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Linq;
using System.Xml;
using System.Configuration;

public partial class yl0414_index : System.Web.UI.Page
{
    protected string name, img, kdd,jp,fs;//定义公共变量，在前台HTML
    //
    protected void Page_Load(object sender, EventArgs e)
   {
       try
       {
           getSignPackage();
           WeChatImg = "https://t7hd.xinbu.in/xbh5/logo.jpg";
           url = "https://t7hd.xinbu.in/xbh5/index.aspx";
           Title = "2分钟内，你能做多少杯咖啡？";
           desc = "中秋特饮挑战赛";

       }
       catch
       {

       }
      
       //    DataSet ds = new DataSet();//创建数据集
       //    string bgtext, xxtext;
       //    ds = WXnewcs.SQLGeneralData("top 1 *", "gkdtzl", "where opid='" + Session["gkopid"].ToString() + "'  ORDER BY id");
       //    if (ds.Tables[0].Rows.Count == 0)
       //    {
       //        bgtext = "[opid]";
       //        xxtext = "'" + Session["gkopid"] + "'";
       //        WXnewcs.SInserData("gkdtzl", bgtext, xxtext, "");
       //        kdd = "1";
       //    }
       //    else
       //    {
       //        if (ds.Tables[0].Rows[0]["dtjl"].ToString() != "0")
       //        {

       //            if (ds.Tables[0].Rows[0]["jp"].ToString() != "没中奖" && ds.Tables[0].Rows[0]["jp"].ToString() != "0")
       //            {
       //                kdd = "2";
       //                jp = ds.Tables[0].Rows[0]["jp"].ToString();
       //            }
       //            else
       //            {
       //                if (int.Parse(ds.Tables[0].Rows[0]["fs"].ToString())>59)
       //                {
       //                    kdd = "3";
                          
       //                }
       //                else
       //                {
       //                    fs = ds.Tables[0].Rows[0]["fs"].ToString();
       //                    kdd = "0";
       //                }
       //            }
       //        }
       //        else
       //        {
                   
       //            kdd = "1";
       //        }
       //    }
       //    name = Session["nickname"].ToString() ;
       //    img = Session["yimg"].ToString();
       //}
       //else
       //{
       //    Response.Redirect("yz.aspx");
       //}
     
       
       
    }
    protected string appId = "wx4413b999bde65bfe";
    protected string appSecret = "2a51e01c2b9a2d490c63fb0e35e515f9";
    protected string time, Contents, WeChatImg, url, Title, desc, timestamps, nonce, signatures, jsapiTickets;//定义公共变量，在前台HTML使用
    static string postUrl, key;
    //
    //得到数据包，返回使用页面  
    public string getSignPackage()
    {
        string jsapiTicket = getJsApiTicket();
        jsapiTickets = jsapiTicket;
        string url = HttpContext.Current.Request.Url.ToString();
        string timestamp = Convert.ToString(ConvertDateTimeInt(DateTime.Now));
        timestamps = timestamp;
        string nonceStr = createNonceStr();
        nonce = nonceStr;
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序  
        string rawstring = "jsapi_ticket=" + jsapiTicket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url + "";
        string signature = SHA1_Hash(rawstring);
        signatures = signature;

        return "0";
    }
    //创建随机字符串  
    private string createNonceStr()
    {
        int length = 16;
        string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        string str = "";
        Random rad = new Random();
        for (int i = 0; i < length; i++)
        {
            str += chars.Substring(rad.Next(0, chars.Length - 1), 1);
        }
        return str;
    }
    //得到ticket 如果文件里时间 超时则重新获取  
    private string getJsApiTicket()
    {
        //这里我从数据库读取
        string jsapi_ticket;
        string api_url;
        string api_param;
        api_url = @"https://api.weixin.qq.com/cgi-bin/token";
        api_param = @"grant_type=client_credential&appid=" + appId + @"&secret=" + appSecret;
        string ret1 = webRequestPost(api_url, api_param);
        string access_token;
        string jsonText = "[" + ret1 + "]";// "[{'a':'aaa','b':'bbb','c':'ccc'},{'a':'aaa2','b':'bbb2','c':'ccc2'}]";
        JArray ja = (JArray)JsonConvert.DeserializeObject(jsonText);
        JObject o = (JObject)ja[0];
        access_token = o["access_token"].ToString();
        api_url = @"https://api.weixin.qq.com/cgi-bin/ticket/getticket";
        api_param = @"access_token=" + access_token + "&type=jsapi";
        string ret2 = webRequestPost(api_url, api_param);
        jsonText = "[" + ret2 + "]";
        ja = (JArray)JsonConvert.DeserializeObject(jsonText);
        o = (JObject)ja[0];
        jsapi_ticket = o["ticket"].ToString();
        string ticket = jsapi_ticket;

        return ticket;

    }
    //发起一个http请球，返回值  
    private string httpGet(string url)
    {
        try
        {
            WebClient MyWebClient = new WebClient();
            MyWebClient.Credentials = CredentialCache.DefaultCredentials;//获取或设置用于向Internet资源的请求进行身份验证的网络凭据  
            Byte[] pageData = MyWebClient.DownloadData(url); //从指定网站下载数据  
            string pageHtml = System.Text.Encoding.Default.GetString(pageData);  //如果获取网站页面采用的是GB2312，则使用这句              

            return pageHtml;
        }


        catch (WebException webEx)
        {
            Console.WriteLine(webEx.Message.ToString());
            return null;
        }
    }
    //SHA1哈希加密算法  
    public string SHA1_Hash(string str_sha1_in)
    {
        SHA1 sha1 = new SHA1CryptoServiceProvider();
        byte[] bytes_sha1_in = System.Text.UTF8Encoding.Default.GetBytes(str_sha1_in);
        byte[] bytes_sha1_out = sha1.ComputeHash(bytes_sha1_in);
        string str_sha1_out = BitConverter.ToString(bytes_sha1_out);
        str_sha1_out = str_sha1_out.Replace("-", "").ToLower();
        return str_sha1_out;
    }
    /// <summary>  
    /// StreamWriter写入文件方法  
    /// </summary>  
    private void StreamWriterMetod(string str, string patch)
    {
        try
        {
            FileStream fsFile = new FileStream(patch, FileMode.OpenOrCreate);
            StreamWriter swWriter = new StreamWriter(fsFile);
            swWriter.WriteLine(str);
            swWriter.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    /// <summary>  
    /// 将c# DateTime时间格式转换为Unix时间戳格式  
    /// </summary>  
    /// <param name="time">时间</param>  
    /// <returns>double</returns>  
    public int ConvertDateTimeInt(System.DateTime time)
    {
        int intResult = 0;
        System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
        intResult = Convert.ToInt32((time - startTime).TotalSeconds);
        return intResult;
    }
    public static string webRequestPost(string url, string param)
    {
        byte[] bs = System.Text.Encoding.UTF8.GetBytes(param);
        HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url + "?" + param);
        req.Method = "Post";
        req.Timeout = 120 * 1000;
        req.ContentType = "application/x-www-form-urlencoded;";
        req.ContentLength = bs.Length;

        using (Stream reqStream = req.GetRequestStream())
        {
            reqStream.Write(bs, 0, bs.Length);
            reqStream.Flush();
        }

        using (WebResponse wr = req.GetResponse())
        {
            //在这里对接收到的页面内容进行处理  
            Stream strm = wr.GetResponseStream();
            StreamReader sr = new StreamReader(strm, System.Text.Encoding.UTF8);

            string line;
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            while ((line = sr.ReadLine()) != null)
            {
                sb.Append(line + System.Environment.NewLine);
            }
            sr.Close();
            strm.Close();
            return sb.ToString();
        }
    }
}