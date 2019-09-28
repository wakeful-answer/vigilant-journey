export let fragmentShader = `uniform sampler2D texture;
varying float vRotation;
varying float vXDistort;
varying float vYDistort;
varying float vFrequency;
varying vec3 vColor;

void main()
{
  float mid = 0.5;

  float xDistortion = sin(gl_PointCoord.x*vFrequency)*vXDistort;
  float yDistortion = cos(gl_PointCoord.y*vFrequency)*vYDistort;

  vec2 rotated = vec2(cos(vRotation) * ((gl_PointCoord.x+xDistortion) - mid) + sin(vRotation) * ((gl_PointCoord.y+yDistortion) - mid) + mid,
                      cos(vRotation) * ((gl_PointCoord.y+yDistortion) - mid) - sin(vRotation) * ((gl_PointCoord.x+xDistortion) - mid) + mid);
  vec4 rotatedTexture = texture2D( texture, rotated );

  gl_FragColor = (vec4( vColor, 1. ) * rotatedTexture) ;
}`

export let vertexShader = `attribute float displacement;
attribute float rotation;
attribute float xDistort;
attribute float yDistort;
attribute vec3 direction;
attribute float customSize;

uniform vec3 customColor;
uniform float frequency;

varying vec3 vColor;
varying float vRotation;
varying float vXDistort;
varying float vYDistort;
varying float vFrequency;

void main()
{

	vColor = customColor; // set color associated to vertex; use later in fragment shader
  vRotation = rotation;
  vXDistort = xDistort;
  vYDistort = yDistort;
  vFrequency = frequency;
  vec3 p = position;

  p.x += direction.x * displacement;
  p.y += direction.y * displacement;
  p.z += direction.z * displacement;

  //p.z =  p.z + (15.) * tan( 0.1 * displacement); //cool effect!

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}`
