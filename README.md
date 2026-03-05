# tiktok-wrapped
I'm going to be honest, I vibe coded the front end for this one. But my excuse is that I wanted to just click publish on the first draft of a larger project I'm working on. 

This project was largely a personal curiosity and an excuse for me to try and learn how to implement cluster analysis. I was inspired by the Washington Post's series of TikTok stories, and decided to also download my own personal TikTok data to see where my attention was drawn towards and what was being recommended to me. 

Here's the general process of what I've done so far:

1. **Request data from TikTok.** TikTok gives a surprising amount of data back to you when you request it. However, it only gives you data for the last 6 months. I requested it once in September and another time in January. 
2. **Pull metadata and clean it.** This was done using yt-dlp. It wasn't completely successful. Of the 13,483 videos I watched from March 2025 to January 2026. 
3. **Download the audio from these videos** Only needed this step because I wanted to 
4. **Transcribe the data.** I had help from Codex for this. I wanted to transcribe it locally and so I initially used Whisper's local model for it. There was a period at the end of last year that I did not touch the project, and when I got back to it, Codex recommended faster-whsisper instead, which I actually did see some improved speed. 
5. **Clean and organise the data.** I just wanted to try and make sense of the data. Here I plotted summary charts and saw that on it's own there were already interesting findings. I noticed that a noticeable percentage of videos that were watched were likely ads. I then manually labelled the videos that I thought/remembered to be ads. For this particular draft of the project, I excluded ads from the list of top creators.
6. **Cluster analysis.** I ran sentence transformers using EmbeddingGemma to find the clusters. 
7. **Compute watch time.** I used the Washington Post's methodology for determining watch events and watch times, which is basically to use the timestamps as an estimate for how long I spent watching a video, and then setting a threshold (if the time between videos is 5 times the length of the previous video) for when I think the I stopped scrolling.

More to come!