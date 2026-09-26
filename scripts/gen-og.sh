#!/bin/sh
# Genera public/og.png (1200x630) para la tarjeta Open Graph / Twitter.
# Reproducible: `sh scripts/gen-og.sh` (requiere ffmpeg).
# Textos: "Crea tu CV gratis en minutos" + "20 plantillas · PDF sin marca de agua
# · Sin registro" (paleta editorial de la app).
set -eu

OUT="public/og.png"
SERIF="/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS="/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
SANS_BOLD="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

F="drawbox=x=730:y=60:w=390:h=510:color=0xFFFFFF:t=fill"          # hoja de CV
F="$F,drawbox=x=762:y=100:w=120:h=14:color=0xC0392B:t=fill"       # acento rojo
F="$F,drawbox=x=762:y=128:w=210:h=10:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=180:w=90:h=10:color=0x1A1918:t=fill"        # sección 1
F="$F,drawbox=x=762:y=200:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=218:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=236:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=276:w=100:h=10:color=0x1A1918:t=fill"       # sección 2
F="$F,drawbox=x=762:y=296:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=314:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=332:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=372:w=70:h=10:color=0x1A1918:t=fill"        # sección 3
F="$F,drawbox=x=762:y=392:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=410:w=326:h=8:color=0xE4E2DC:t=fill"
F="$F,drawbox=x=762:y=450:w=90:h=20:color=0xF3F2EE:t=fill"        # skills chips
F="$F,drawbox=x=864:y=450:w=70:h=20:color=0xF3F2EE:t=fill"
F="$F,drawbox=x=946:y=450:w=60:h=20:color=0xF3F2EE:t=fill"

T="drawbox=x=80:y=84:w=16:h=16:color=0xC0392B:t=fill"              # marca + titular
T="$T,drawtext=fontfile=$SERIF:text='CVMakerApp':x=108:y=66:fontsize=36:fontcolor=0xFAFAF8"
T="$T,drawtext=fontfile=$SERIF:text='Crea tu CV gratis':x=80:y=210:fontsize=76:fontcolor=0xFAFAF8"
T="$T,drawtext=fontfile=$SERIF:text='en minutos':x=80:y=302:fontsize=76:fontcolor=0xFAFAF8"
T="$T,drawbox=x=80:y=406:w=96:h=6:color=0xC0392B:t=fill"
T="$T,drawtext=fontfile=$SANS:text='20 plantillas · PDF sin marca de agua · Sin registro':x=80:y=448:fontsize=27:fontcolor=0x9C9890"
T="$T,drawtext=fontfile=$SANS_BOLD:text='cvmakerapp.vercel.app':x=80:y=520:fontsize=24:fontcolor=0x6B6860"

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0x1A1918:s=1200x630" \
  -vf "${F},${T}" \
  -frames:v 1 "$OUT"
echo "OK -> $OUT"
