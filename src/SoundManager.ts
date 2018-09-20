
class SoundManagerClass {

    private bgmChannel: egret.SoundChannel;     //背景音声道
    private _allowPlayEffect: boolean = true;   //是否允许播放音效
    private _allowPlayBGM: boolean = true;      //是否允许播放背景音乐
    private _effectVolume: number = 1;          //音效音量
    private _bgmVolume: number = 1;             //背景音量



    public constructor() {

    }


	/**
	 * 播放音效
	 * @param soundName 声音名
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playEffect(soundName: string, startTime: number = 0, loops: number = 1) {
        if (this.allowPlayEffect == false) {
            return;
        }
        var sound: egret.Sound = RES.getRes(soundName);
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            var channel: egret.SoundChannel = sound.play(startTime, loops);
            channel.volume = this._effectVolume;
        }
    }

	/**
	 * 播放背景音乐
	 * @param bgmName 背景音名
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playBGM(bgmName: string, startTime: number = 0, loops: number = Number.MAX_VALUE) {
        if (this.allowPlayBGM == false || this.bgmChannel != null) {
            return;
        }
        this.stopBGM();
        var bgm: egret.Sound = RES.getRes(bgmName);
        if (bgm) {
            bgm.type = egret.Sound.MUSIC;
            this.bgmChannel = bgm.play(startTime, loops);
            this.bgmChannel.volume = this._bgmVolume;
        }

    }

    /**停止背景音乐*/
    public stopBGM() {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    }

    /**获取是否允许播放音效*/
    public get allowPlayEffect() {
        return this._allowPlayEffect;
    }

    /**设置是否允许播放音效*/
    public set allowPlayEffect(bAllow: boolean) {
        this._allowPlayEffect = bAllow;
    }

    /**获取是否允许播放背景音*/
    public get allowPlayBGM() {
        return this._allowPlayBGM;
    }

    /**设置是否允许播放背景音*/
    public set allowPlayBGM(bAllow: boolean) {
        this._allowPlayBGM = bAllow;
        if (this._allowPlayBGM == false) {
            this.stopBGM();
        } else {
            // this.playBGM(SoundManager.bgm);
        }
    }

    /**获取音效音量*/
    public get effectVolume() {
        return this._effectVolume;
    }

    /**设置音效音量*/
    public set effectVolume(value: number) {
        this._effectVolume = value;
    }

    /**获取BGM音量*/
    public get bgmVolume() {
        return this._bgmVolume;
    }

    /**设置BGM音量*/
    public set bgmVolume(value: number) {
        this._bgmVolume = value;
        if (this.bgmChannel) {
            this.bgmChannel.volume = this._bgmVolume;
        }
    }

    /**停止所有声音 */
    public stopAllSound() {
        this.stopBGM();
    }
}

var SoundManager = new SoundManagerClass();
