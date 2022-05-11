using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;
using System.Diagnostics;
using System.Data;
using System.Data.Common;
using MySql.Data;
using MySql.Data.MySqlClient;

public partial class WDeviowaWebGPUPage : System.Web.UI.Page 
{
    private string connection = ConfigurationManager.ConnectionStrings["user_wdeviowaConnectionString"].ConnectionString;

    protected void Page_Load(object sender, EventArgs e) 
    {
        Debug.WriteLine("WDeviowaExamplePage: page loaded...");
    }

    public static string GetContentURL( string url )
    {
	try {
        	string content = string.Empty;

		HttpWebRequest request = (HttpWebRequest)WebRequest.Create( url );
		request.AutomaticDecompression = DecompressionMethods.GZip;

		using(HttpWebResponse response = (HttpWebResponse)request.GetResponse()) {
			using(Stream stream = (Stream)response.GetResponseStream()) {
				using(StreamReader reader = new StreamReader(stream)) {
					content = reader.ReadToEnd();
				}
			}
		}

		return content;
	}
	catch( WebException e )
 	{
 	        return e.Message;
	}
	catch( Exception e )
 	{
 	        return e.Message;
	}
    }
	
}
