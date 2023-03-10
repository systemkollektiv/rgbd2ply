# rgbd2ply

converts images that consist of a depth map on the left and a color map on the right of the images into ply files.

### installation

```bash
npm i -g rgbd2ply
```

after installation, the command "rgbd2ply" should be available in your terminal.

### usage

```bash
rgbd2ply --help
```

to get detailed help output.

flags:

```
--help              - alias: ["-help", "help", "--h", "-h"]
--input             - the image input file - alias: ["-i"]
--output            - the file to write the data to - default: 'ply.ply' - alias: ["--out", "-o"]
--point-offset-x-cm - how many centimeters should each point be offset on the x axis - default: 1 - alias: ["--point-offset-x", "--offset-x", "-x"]
--point-offset-y-cm - how many centimeters should each point be offset on the y axis - default: 1 - alias: ["--point-offset-y", "--offset-y", "-y"]
--z-multiplier      - multiplies the final depth value - default: 1 - alias: ["--z-mult", "-z"]
--bw                - use a greyscale depth image - alias: ["-bw"]
```
