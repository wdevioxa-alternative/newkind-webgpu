<%@ Page Language="C#" MasterPageFile="~/wdeviowa.master" CodeFile="webgpu.aspx.cs" Inherits="WDeviowaWebGPUPage" %>

<asp:Content ID="navigationContent" ContentPlaceHolderID="navigation" Runat="server">
	<div class="fs-p6 fw-b900 pl-1">WebGPU Test Page</div>
</asp:Content>

<asp:Content ID="mainContent" ContentPlaceHolderID="main" Runat="server">
	<script type="text/javascript" src="webgpu/main.bundle.js"></script>
	<script type="text/javascript">
		jQuery(document).ready(function () {


	        });
	</script>
	<div class="fs-default w-f mt-2 mb-2">
		<%= WDeviowaWebGPUPage.GetContentURL("http://178.44.114.150/webgpu/index.html") %>
	</div>
</asp:Content>
