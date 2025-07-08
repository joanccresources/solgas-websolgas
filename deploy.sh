#!/bin/bash

echo "📂 Creando carpetas en standalone..."
mkdir -p .next/standalone/public .next/standalone/static .next/standalone/cache

echo "🚀 Copiando archivos..."
cp -r public/. .next/standalone/public/
cp -r .next/static/. .next/standalone/static/
cp -r .next/cache/. .next/standalone/cache/

echo "✅ Copia completada!"