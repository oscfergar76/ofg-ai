@echo off
title Conectar Google NotebookLM con OFG.ai Studio
echo ========================================================
echo   OFG.ai Studio - Conectar Google NotebookLM
echo ========================================================
echo.
echo Abriendo ventana de Chrome para iniciar sesion...
echo Por favor, introduce tu correo y contrasena en la ventana que aparecera.
echo En cuanto entres en NotebookLM, la ventana se cerrara sola.
echo.
cd /d "C:\Users\oscfe\Projects\ofg-ai"
node scripts/auth-notebooklm.mjs
echo.
echo ========================================================
echo Proceso finalizado.
echo ========================================================
pause
