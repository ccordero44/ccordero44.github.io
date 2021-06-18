Dim installPath
Dim toolkitPath
Dim userPath
Dim accessPath

SourceFile = WScript.Arguments(0) 

filesPath = "\\afic-public\Departments\Claims\Carlos Toolkits\Claims Toolkit\files\"

updateFile(filesPath)

MsgBox("update complete")


Function updateFile(path)
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
If fso.FolderExists(path) Then 
DestinationFile = path
    'Check to see if the file already exists in the destination folder
    If fso.FileExists(DestinationFile) Then
        'Check to see if the file is read-only
       
        If Not fso.GetFile(DestinationFile).Attributes And 1 Then 
                     'The file exists and is not read-only.  Safe to replace the file.
            fso.CopyFile SourceFile, path, True
'            MsgBox "file found and not read only"
        Else 
            'The file exists and is read-only.
            'Remove the read-only attribute
            
            fso.GetFile(DestinationFile).Attributes = fso.GetFile(DestinationFile).Attributes - 1
'            MsgBox "removing read only attribute"
            'Replace the file
            
            fso.CopyFile SourceFile, path, True
'            MsgBox "replacing file"
            'Reapply the read-only attribute
            
            fso.GetFile(DestinationFile).Attributes = fso.GetFile(DestinationFile).Attributes + 1
'            MsgBox "making file read only"
        End If
    Else
        'The file does not exist in the destination folder.  Safe to copy file to this folder.
        fso.CopyFile SourceFile, path, True
'       MsgBox "file not found and created"
    End If
'Set fso = Nothing
MsgBox SourceFile & vbNewLine &" saved to " & vbNewLine & path, ,"File updated"
Else 


If Err.Number <> 0 Then 
Msgbox "Number of the Error and Description is "& Err.Number & " " & Err.Description 
Err.Clear 
End If
End If 


Set fso = Nothing

End function