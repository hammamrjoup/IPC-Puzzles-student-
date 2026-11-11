Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strBaseDir = fso.GetParentFolderName(WScript.ScriptFullName)
command = "powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File """ & strBaseDir & "\launch_background.ps1"""
exitCode = WshShell.Run(command, 0, True)
If exitCode <> 0 Then
    MsgBox "AVH could not start. Check serve_error.log and serve_output.log in the application folder.", 16, "AVH Occupational Health"
End If