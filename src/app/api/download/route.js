import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { randomUUID } from 'crypto';

const execPromise = promisify(exec);

export async function POST(request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    
    // Create a unique ID for this download
    const downloadId = randomUUID();
    const tempDir = path.join(process.cwd(), 'tmp');
    const outputPath = path.join(tempDir, `${downloadId}.mp4`);
    
    // Ensure the temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Execute yt-dlp to download the video
    // Note: yt-dlp must be installed on the server
    const ytDlpCommand = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" "${url}" -o "${outputPath}" --no-playlist`;
    
    await execPromise(ytDlpCommand);
    
    // Check if the file exists
    if (!fs.existsSync(outputPath)) {
      return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
    }
    
    // Get video metadata for filename
    const { stdout } = await execPromise(`yt-dlp --print filename -o "%(title)s.%(ext)s" --no-playlist "${url}"`);
    const sanitizedFileName = stdout.trim().replace(/[\\/:"*?<>|]/g, '_');
    
    // Read the file
    const videoData = fs.readFileSync(outputPath);
    
    // Delete the temp file
    fs.unlinkSync(outputPath);
    
    // Create the response with the file data
    const response = new NextResponse(videoData);
    
    // Set appropriate headers
    response.headers.set('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);
    response.headers.set('Content-Type', 'video/mp4');
    
    return response;
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}
