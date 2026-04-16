<%@ Language="VBScript" CodePage="65001" %>
<%
  ' ================================================================
  ' event_report.asp
  ' 이벤트 제보하기 처리 — POST 요청을 받아 DB에 pending 상태로 저장
  ' 인코딩: UTF-8
  ' ================================================================
  Response.ContentType = "application/json"
  Response.Charset     = "UTF-8"
  Session.CodePage     = 65001

  ' ── 로그인 체크 ─────────────────────────────────────────────
  If Session("member_id") = "" Then
    Response.Write "{""ok"":false,""msg"":""로그인이 필요합니다.""}"
    Response.End
  End If

  ' ── POST 전용 ─────────────────────────────────────────────
  If Request.ServerVariables("REQUEST_METHOD") <> "POST" Then
    Response.Write "{""ok"":false,""msg"":""잘못된 요청입니다.""}"
    Response.End
  End If

  ' ── 입력값 수집 ─────────────────────────────────────────────
  Dim sTitle, sOrganizer, sEventType, sStartDate, sEndDate
  Dim sDeadline, sLocation, sExternalUrl, sDescription
  Dim sImagePath, nReporterId

  sTitle       = Trim(Request.Form("rep_title"))
  sOrganizer   = Trim(Request.Form("rep_organizer"))
  sEventType   = Trim(Request.Form("rep_type"))
  sStartDate   = Trim(Request.Form("rep_start_date"))
  sEndDate     = Trim(Request.Form("rep_end_date"))
  sDeadline    = Trim(Request.Form("rep_deadline"))
  sLocation    = Trim(Request.Form("rep_location"))
  sExternalUrl = Trim(Request.Form("rep_url"))
  sDescription = Trim(Request.Form("rep_desc"))
  nReporterId  = CLng(Session("member_id"))

  ' ── 필수값 검증 ─────────────────────────────────────────────
  If sTitle = "" Or sOrganizer = "" Or sEventType = "" _
     Or sStartDate = "" Or sEndDate = "" Or sExternalUrl = "" Then
    Response.Write "{""ok"":false,""msg"":""필수 항목을 모두 입력해 주세요.""}"
    Response.End
  End If

  ' ── 이미지 업로드 처리 (선택) ────────────────────────────────
  ' 실제 파일 업로드는 서버 컴포넌트(예: Persits ASPUpload) 사용
  ' 여기서는 경로 변수만 선언
  sImagePath = ""
  ' If Request.Files("rep_image").Size > 0 Then
  '   Dim sUploadDir : sUploadDir = Server.MapPath("/uploads/events/")
  '   Dim sFileName  : sFileName  = "evt_" & Replace(Now(), "/", "") & ".jpg"
  '   Request.Files("rep_image").SaveAs sUploadDir & sFileName
  '   sImagePath = "/uploads/events/" & sFileName
  ' End If

  ' ── DB 저장 ─────────────────────────────────────────────────
  Dim oConn, oCmd, sSQL
  Dim sConnStr

  sConnStr = "Provider=SQLOLEDB;Data Source=.;Initial Catalog=e4ds_make;" _
           & "User ID=sa;Password=yourpassword;"

  Set oConn = Server.CreateObject("ADODB.Connection")
  oConn.Open sConnStr

  sSQL = "INSERT INTO tbl_event_report " _
       & "(event_title, organizer, event_type, start_date, end_date, " _
       & " deadline_date, location, external_url, description, " _
       & " image_path, status, reporter_id, created_at) " _
       & "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, GETDATE())"

  Set oCmd = Server.CreateObject("ADODB.Command")
  With oCmd
    .ActiveConnection = oConn
    .CommandText      = sSQL
    .CommandType      = 1  ' adCmdText
    .Parameters.Append .CreateParameter("@event_title",   200, 1, 200, sTitle)
    .Parameters.Append .CreateParameter("@organizer",     200, 1, 200, sOrganizer)
    .Parameters.Append .CreateParameter("@event_type",    200, 1,  50, sEventType)
    .Parameters.Append .CreateParameter("@start_date",      7, 1,   0, CDate(sStartDate))
    .Parameters.Append .CreateParameter("@end_date",        7, 1,   0, CDate(sEndDate))
    If sDeadline <> "" Then
      .Parameters.Append .CreateParameter("@deadline_date", 7, 1, 0, CDate(sDeadline))
    Else
      .Parameters.Append .CreateParameter("@deadline_date", 7, 1, 0, Null)
    End If
    .Parameters.Append .CreateParameter("@location",      200, 1, 200, sLocation)
    .Parameters.Append .CreateParameter("@external_url",  200, 1, 500, sExternalUrl)
    .Parameters.Append .CreateParameter("@description",   201, 1,   0, sDescription)
    .Parameters.Append .CreateParameter("@image_path",    200, 1, 300, sImagePath)
    .Parameters.Append .CreateParameter("@reporter_id",     3, 1,   0, nReporterId)
    .Execute
  End With

  oConn.Close
  Set oCmd  = Nothing
  Set oConn = Nothing

  Response.Write "{""ok"":true,""msg"":""제보가 등록되었습니다.""}"
%>
